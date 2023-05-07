const express = require('express')

const { createTweet, getTweets, getUserTweets, deleteTweet, updateTweet } = require('../controllers/tweetsController')

const Tweet = require('../models/tweetModel')
const router = express.Router()


// GET all tweets
router.get('/:userId', getTweets)

//GET user's tweets
router.get('/me/:userId', getUserTweets)

// POST new tweet
router.post('/', createTweet)

router.delete('/:id', deleteTweet)

router.patch('/:id', updateTweet)

//UPDATE a tweet
router.patch('/:id', (req, res) => {
    res.json({ mssg: 'UPDATE tweet' })
})




module.exports = router;
