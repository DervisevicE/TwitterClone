const express = require('express')
const {getBookmarks, bookmark, removeBookmark} = require('../controllers/bookmarksController')
const router = express.Router()

router.get('/', getBookmarks)

router.post('/', bookmark)

router.delete('/:id', removeBookmark)

module.exports = router