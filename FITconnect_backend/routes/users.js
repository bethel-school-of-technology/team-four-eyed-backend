var express = require('express');
const { User } = require('..models');
var router = express.Router();


// POST User
router.post('/', (req, res, next) => {

  if (req.body.username || !req.body.password) {
    res.status(400).send('Username and pw required');
    return;
  }


  User.create({
    username: req.body.username,
    password: req.body.password
  }).then(newUser => {
    res.json({
      id: newUser.id,
      username: newUser.username
    });

  }).catch(() => {
    res.status(400).send();
  });
});



module.exports = router;
