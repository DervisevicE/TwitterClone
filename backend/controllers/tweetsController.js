const { default: mongoose } = require('mongoose')
const Tweet = require('../models/tweetModel')
const User = require('../models/userModel')

// get all tweets
const getTweets = async (req, res) => {
    const userId = req.user;
    const { id, authorId } = req.query

    if (!mongoose.Types.ObjectId.isValid(userId._id)) {
        return res.status(404).json({ error: 'No such user' })
    }

    const user = await User.findById({ _id: userId._id })

    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }

    let tweets = []

    if (id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such tweet' })
        }

        tweets = await Tweet.findById(id)
    } else if (authorId) {
        if (!mongoose.Types.ObjectId.isValid(authorId)) {
            return res.status(404).json({ error: 'No such user' })
        }
        tweets = await Tweet.find({ author: authorId }).sort({ createdAt: -1 })
    }
    else {
        tweets = await Tweet.find({
            author: { $in: [...user.following, userId._id] }
        }).sort({ createdAt: -1 })
    }

    if (!tweets) {
        return res.status(404).json({ error: 'No such tweet' })
    }

    res.status(200).json(tweets)
}

const getUserTweets = async (req, res) => {
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ error: 'No such user' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'No such user' });
        }

        const tweets = await Tweet.find({ author: userId }).sort({ createdAt: -1 });

        if (userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        res.status(200).json(tweets);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// post new tweet
const createTweet = async (req, res) => {
    const author = req.user._id
    const { content } = req.body
    try {
        const tweet = await Tweet.create({ author, content })
        res.status(200).json(tweet)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete tweet
const deleteTweet = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such tweet' })
    }

    const tweet = await Tweet.findOneAndDelete({ _id: id })

    if (!tweet) {
        return res.status(404).json({ error: 'No such tweet' })
    }

    return res.status(200).json(tweet)

}

// update tweet
const updateTweet = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such tweet' })
    }

    const tweet = await Tweet.findOneAndUpdate({ _id: id }, { ...req.body })

    if (!tweet) {
        return res.status(404).json({ error: 'No such tweet' })
    }

    return res.status(200).json(tweet)
}



module.exports = {
    createTweet,
    getTweets,
    getUserTweets,
    deleteTweet,
    updateTweet,
};


