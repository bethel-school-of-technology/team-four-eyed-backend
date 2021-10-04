var express = require('express');
const { Trainers } = require('../models');
var router = express.Router();
var bcrypt = require('bcrypt');
var auth = require('../services/auth');


router.get('/', function (req, res, next) {

  Trainers.findAll().then(trainerlist => {
    res.json({
      status: 200,
      message: "Returning all trainers",
      trainers: trainerlist
    });
  })
});

/*GET/:id get individual trainer*/
router.get('/:id', (req, res, next) => {
  const trainerId = parseInt(req.params.trainerId);

  Trainers.findOne({
    where: {
      trainerId: trainerId
    }
  }).then(theTrainers => {
    if (theTrainers) {
      res.json(theTrainers);
    } else {
      res.status(404).send();
    }
  }, err => {
    res.status(500).send(err);
  })
});

// POST Trainer
router.post('/signup', async (req, res, next) => {

  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);


  let [result, created] = await Trainers.findOrCreate({
    where: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: hashedpassword
    }
  })
  if (created) {
    res.json({
      status: 200,
      message: "Created Successfully"
    })
  } else {
    res.json({
      status: 400,
      message: "Conflict creating the profile"
    })
    console.log(result);
  }
})



//post Signin
router.post('/login', async (req, res, next) => {
  Trainers.findOne({
    where: {
      username: req.body.username,
    }
  }).then(async trainers => {
    // check if user exists
    console.log(trainers);
    if (!trainers) {
      res.status(404).send('Invalid username');
      return;
    }

    // check the password
    const valid = await bcrypt.compare(req.body.password, trainers.password);

    if (valid) {
      // create the token
      const jwt = auth.createJWT(trainers);
      res.status(200).send({ jwt, trainerId: trainers.trainerId });
    } else {
      res.status(401).send('Invalid password');
    }
  });
});



module.exports = router;
