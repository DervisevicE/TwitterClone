const express = require('express')
const {signupUser, loginUser, getUser, updateUserDetails, deleteUser, getFollowers, getFollowing, followUser, unfollowUser, getRandomUsers, getUserById} = require('../controllers/usersController')
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
router.get('/followers', jwtGuard, getFollowers)

// GET user following
router.get('/following', jwtGuard, getFollowing)

// Follow user
router.post('/:followId/follow', jwtGuard, followUser)

// Unfollow user
router.post('/:unfollowId/unfollow', jwtGuard, unfollowUser)

router.get('/random', jwtGuard, getRandomUsers);

router.get('/:id', jwtGuard, getUserById)


module.exports = router