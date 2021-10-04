var express = require('express');
var router = express.Router();
const { Articles } = require("../models");
const auth = require('../services/auth');



/* GET return all articles */
router.get('/', function (req, res, next) {

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
      articleId: articleId
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
  console.log('req.body', req.body);
  const trainers = req.trainers;

  if (!trainers) {
    res.status(403).send();
    return;
  }
  //create the article with the trainer id

  try {
    await Articles.findOrCreate({
      where: {
        title: req.body.title,
        body: req.body.body,
        trainerId: req.body.trainerId
      }
    })
    .then(() => {
      if (trainers) {
        res.json({
          status: 200,
          message: "Created Successfully"
        });
      }
    });
  } catch (e) {
    res.send(400);
  }
})

/* PUT/:id update a article */
router.put('/:id', (req, res, next) => {
  const articleId = parseInt(req.body.articleId);
  console.log(req);

  if (!articleId || articleId <= 0) {

    res.status(400).send('Invalid ID');
    return;
  }

  const trainers = req.trainers;

  if (!trainers) {
    res.status(403).send();
    return;
  }

  Articles.update({
    title: req.body.title,
    body: req.body.body
  }, {
    where: {
      articleId: articleId
    }
  }).then(() => {
    res.status(204).send();
  }).catch(() => {
    res.status(400).send();
  })

});


/* DELETE delete a article */
router.delete("/:id", async (req, res, next) => {
  console.log(req)

  const trainers = req.trainers;

  if (!trainers) {
    res.status(403).send();
    return;
  }
console.log(req)
  await Articles.destroy({
    where: { articleId:parseInt(req.params.id) }
  })
    .then(result => res.redirect('/articles'))
    .catch(err => {
      res.status(400);
      res.send("There was a problem deleting the article");
    }
    );
});


module.exports = router;