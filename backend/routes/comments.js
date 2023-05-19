const express = require('express')
const { createComment, getComments, deleteComment, getCommentById} = require('../controllers/commentsController')
const jwtGuard = require('../middleware/auth')

const router = express.Router()

router.post('/', jwtGuard, createComment)

router.get('/:tweetId', getComments)

router.delete('/:id', deleteComment)

router.get('/:id', getCommentById)

module.exports = router