const express = require('express');
const router = require('express-promise-router')();
const tweetController = require('../controllers/tweetController');
// Middleware
const { validateParam, validateBody, schemas, verifyToken } = require('../helpers/helpers');

router.route('/search')
  .get(verifyToken(), tweetController.searchTweets);

router.route('/')
  .get(tweetController.getTweets)
  .post([verifyToken(), validateBody(schemas.tweetSchema)], tweetController.createTweet);

router.route('/:tweetID')
  .get(validateParam(schemas.idSchema, 'tweetID'), tweetController.getTweet)
  .put([verifyToken(), validateParam(schemas.idSchema, 'tweetID'), validateBody(schemas.tweetSchema)],
    tweetController.replaceTweet)
  .patch([verifyToken(), validateParam(schemas.idSchema, 'tweetID'), validateBody(schemas.tweetSchemaOptional)],
    tweetController.updateTweet)
  .delete([verifyToken(), validateParam(schemas.idSchema, 'tweetID')],
    tweetController.deleteTweet);

module.exports = router;
