const { default: mongoose } = require('mongoose')
const Tweet = require('../models/tweetModel')
const Like = require('../models/likeModel')
const User = require('../models/userModel')

const getLikes = async (req, res) => {
    const { tweetId } = req.params

    if (!mongoose.Types.ObjectId.isValid(tweetId)) {
        return res.status(404).json({ error: 'No such tweet' })
    }

    const tweet = await Tweet.findById(tweetId)

    if (!tweet) {
        return res.status(404).json({ error: 'No such tweet' })
    }

    const likesIds = tweet.likes

    const likes = await Like.find({ _id: { $in: likesIds } })

    res.status(200).json(likes)
}


const likeTweet = async (req, res) => {
    const user = req.user;
    const { tweet } = req.body

    const exists = await Like.findOne({ user: user._id, tweet: tweet })
    if (exists) {
        return res.status(400).json({ error: 'You already liked this tweet' })
    }
    try {
        const like = await Like.create({user: user._id, tweet: tweet })
        const twt = await Tweet.findById(tweet)

        if (!twt) {
            return res.status(404).json({ error: 'No such tweet' })
        }

        twt.likes.push(like._id)
        await twt.save()

        res.status(200).json(like)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const unlikeTweet = async (req, res) => {
    const { id } = req.params
    const user = req.user;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such like' })
    }

    const like = await Like.findByIdAndDelete(id)

    if (!like) {
        return res.status(404).json({ error: 'No such like' })
    }

    const tweet = await Tweet.findByIdAndUpdate(
        like.tweet,
        { $pull: { likes: like._id } },
        { new: true }
    );

    if (!tweet) {
        return res.status(404).json({ error: 'No such tweet' })
    }

    res.status(200).json({ message: 'Tweet unliked successfully' })
}


module.exports = {
    getLikes,
    likeTweet,
    unlikeTweet
}