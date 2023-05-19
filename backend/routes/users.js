const express = require('express')
const {signupUser, loginUser, getUser, updateUserDetails, deleteUser, getFollowers, getFollowing, followUser, unfollowUser} = require('../controllers/usersController')
const User = require('../models/userModel')
const jwtGuard = require('../middleware/auth')
const router = express.Router()

// CREATE new user
router.post('/signup', signupUser)

// LOGIN user
router.post('/login', loginUser)

// GET user by id
router.get('/',jwtGuard, getUser)

// UPDATE user detalis by id
router.patch('/', jwtGuard, updateUserDetails)

// DELETE user
router.delete('/', jwtGuard, deleteUser)

// GET user followers
router.get('/:id/followers', jwtGuard, getFollowers)

// GET user followint
router.get('/:id/following', jwtGuard, getFollowing)

// Follow user
router.post('/:id/follow', jwtGuard, followUser)

// Unfollow user
router.post('/:id/unfollow', jwtGuard, unfollowUser)

module.exports = router