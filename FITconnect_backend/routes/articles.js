var express = require('express');
var router = express.Router();
const {Articles} = require("../models");
const articles = require('../models/articles');
var auth = require('../services/auth');


/* GET return all articles */
router.get('/', function(req, res, next) {
  Articles.findAll().then(articlelist => {
    res.json({
      status: 200,
      message: "Returning all articles",
      articles: articlelist
    });
  })  
});

/*GET/:id get individual article*/ 
router.get('/:id', (req, res, next) => {
  const articleId = parseInt(req.params.id);

  Articles.findOne({
    where: {
      id: articleId
    }
  }).then(theArticle => {
      if (theArticle) {
        res.json(theArticle);
      } else {
        res.status(404).send();
      }
  }, err => {
    res.status(500).send(err);
  })
});

/* POST create a article */
router.post('/', async (req, res, next) => {

  const trainers = req.trainers;

  if (!articles) {
    res.status(403).send();
      return;
  }

  let [result, created] = await Articles.findOrCreate({
    where: {
      title: req.body.title
    },
    defaults: {
      body: req.body.body,
      trainerId: req.body.id
    }
  })
  if (created){
    res.json({
      status: 200,
      message: "Created Successfully"
    });
  }else {
    res.json({
      status: 400, 
      message: "Conflict creating the article"
    });
  }
  console.log(result);
})

/* PUT/:id update a article */
router.put('/:id', (req, res, next) => {
  const articleId = parseInt(req.params.id);

  const trainers = req.trainers;

  if (!articles) {
    res.status(403).send();
      return;
  }

  if (!articleId || articleId <= 0) {
    res.status(400).send('Invalid ID');
    return;
  }

  Articles.update({
    title: req.body.title,
    body: req.body.body
  }, {
    where: {
      id: articleId
    }
  }).then(() => {
    res.status(204).send();
  }).catch(() => {
    res.status(400).send();
  })

});


/* DELETE delete a article */
router.delete("/:id", async (req, res, next) => {
  
  const trainers = req.trainers;

  if (!articles) {
    res.status(403).send();
      return;
  }

  let [result] = await Articles.destroy({
      where: { articleId: articleId }
    })
    .then(result => res.redirect('/trainers'))
    .catch(err => { 
      res.status(400); 
      res.send("There was a problem deleting the article"); 
    }
);
});


module.exports = router;  