var express = require('express');
const { Trainers } = require('../models');
var router = express.Router();
var bcrypt = require('bcrypt');
var auth = require('../services/auth');
const trainers = require('../models/trainers');
//var authService = require('../services/auth');


// POST Trainer
router.post('/', async (req, res, next) => {

  if (req.body.username || !req.body.password) {
    res.status(400).send('Username and pw required');
    return;
  }

  //hash the pw

  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);


  Trainers.create({
    username: req.body.username,
    password: req.body.password
  }).then(newTrainer => {
    res.json({
      id: newTrainer.id,
      username: newTrainer.username
    });

  }).catch(() => {
    res.status(400).send();
  });
});

  //post Signin
  router.post('/login', async (req, res, next) => {
     Trainers.findOne({
      where: {
        username: req.body.username
      }
    }).then(async user => {
      // check if user exists
      if (!user) {
        res.status(404).send('Invalid username');
        return;
      }

      // check the password
      const valid = await bcrypt.compare(req.body.password, trainers.password);

      if (valid) {
        // create the token
        const jwt = auth.createJWT(user);
        res.status(200).send({ jwt });
      } else {
        res.status(401).send('Invalid password');
      } 
    });
  });


  module.exports = router;
