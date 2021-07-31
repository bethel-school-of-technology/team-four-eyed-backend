var express = require('express');
const { Trainers } = require('../models');
var router = express.Router();
var bcrypt = require('bcrypt');
var auth = require('../services/auth');


// POST Trainer
router.post('/', async (req, res, next) => {

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
    if (!trainers) {
      res.status(404).send('Invalid username');
      return;
    }

    // check the password
    const valid = await bcrypt.compare(req.body.password, trainers.password);

    if (valid) {
      // create the token
      const jwt = auth.createJWT(trainers);
      res.status(200).send({ jwt });
    } else {
      res.status(401).send('Invalid password');
    }
  });
});



module.exports = router;
