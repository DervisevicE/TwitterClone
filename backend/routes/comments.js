const express = require('express')
const { createComment, getComments, deleteComment } = require('../controllers/commentsController')

const router = express.Router()

router.post('/', createComment)

router.get('/:tweetId', getComments)

router.delete('/:id', deleteComment)


module.exports = router