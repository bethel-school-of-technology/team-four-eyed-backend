var express = require('express');
var router = express.Router();
const {Articles} = require("../models");

/* GET return all articles */
router.get('/', function(req, res, next) {
  Articles.findAll().then(articlelist => {
    res.json(articlelist);
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
router.post('/', (req, res, next)=> {
  Articles.create({
    title: req.body.title,
    body: req.body.body
  }).then(newArticle => {
    res.json(newArticle);
  }). catch(() => {
    res.status(400).send();
  });
});

/* PUT/:id update a article */
router.put('/:id', (req, res, next) => {
  const articleId = parseInt(req.params.id);

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
router.delete('/:id', (req, res, next) => {
  const articleId = parseInt(req.params.id);

  if (!articleId || articleId <= 0) {
    res.status(400).send('Invalid ID');
    return;
  }

  Articles.destroy({
    where: {
      id: articleId
    }
  }).then(() => {
    res.status(204).send();
  }).catch(() => {
    res.status(400).send();
  })
});


module.exports = router;  