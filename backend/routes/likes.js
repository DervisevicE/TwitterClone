const express = require('express')
const {getLikes, likeTweet, unlikeTweet} = require('../controllers/likesController')
const router = express.Router()

router.get('/:tweetId', getLikes)

router.post('/', likeTweet)

router.delete('/:id', unlikeTweet)

module.exports = router