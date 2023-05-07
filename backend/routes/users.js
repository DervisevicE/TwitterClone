const express = require('express')
const {createUser, getUser, updateUserDetails, deleteUser, getFollowers, getFollowing, followUser, unfollowUser} = require('../controllers/usersController')
const User = require('../models/userModel')
const router = express.Router()

// CREATE new user
router.post('/', createUser)

// GET user by id
router.get('/:id', getUser)

// UPDATE user detalis by id
router.patch('/:id', updateUserDetails)

// DELETE user
router.delete('/:id', deleteUser)

// GET user followers
router.get('/:id/followers', getFollowers)

// GET user followint
router.get('/:id/following', getFollowing)

// Follow user
router.post('/:id/follow', followUser)

// Unfollow user
router.post('/:id/unfollow', unfollowUser)

module.exports = router