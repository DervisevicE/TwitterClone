const express = require('express')
const {getReposts, repost, deleteRepost} = require('../controllers/repostsController')
const router = express.Router()

router.get('/:tweetId', getReposts)

router.post('/', repost)

router.delete('/:id', deleteRepost)

module.exports = router