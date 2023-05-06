const express = require('express')

const { createTweet, getTweets, deleteTweet, updateTweet } = require('../controllers/tweetsController')

const Tweet = require('../models/tweetModel')
const router = express.Router()


// GET all tweets
router.get('/', getTweets)

// POST new tweet
router.post('/', createTweet)

router.delete('/:id', deleteTweet)

router.patch('/:id', updateTweet)

//UPDATE a tweet
router.patch('/:id', (req, res) => {
    res.json({ mssg: 'UPDATE tweet' })
})




module.exports = router;
