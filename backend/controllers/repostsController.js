const { default: mongoose } = require('mongoose')
const Tweet = require('../models/tweetModel')
const User = require('../models/userModel')
const Repost = require('../models/repostModel')

const getReposts = async (req, res) => {
    const { tweetId } = req.params

    if (!mongoose.Types.ObjectId.isValid(tweetId)) {
        return res.status(404).json({ error: 'No such tweet' })
    }

    const tweet = await Tweet.findById(tweetId)

    if (!tweet) {
        return res.status(404).json({ error: 'No such tweet' })
    }

    const repostsIds = tweet.reposts

    const reposts = await Repost.find({ _id: { $in: repostsIds } })

    res.status(200).json(reposts)

}

const repost = async (req, res) => {
    const { tweet, user } = req.body

    try {
        const repost = await Repost.create({ tweet, user })
        const twt = await Tweet.findById(tweet)
        if (!twt) {
            return res.status(404).json({ error: 'No such tweet' })
        }

        twt.reposts.push(repost._id)
        await twt.save()

        return res.status(200).json(repost)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const deleteRepost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such repost' })
    }

    const repost = await Repost.findByIdAndDelete(id)

    if (!repost) {
        return res.status(404).json({ error: 'No such repost' })
    }

    const tweet = await Tweet.findByIdAndUpdate(
        repost.tweet,
        { $pull: { reposts: repost._id } },
        { new: true }
      );

    if (!tweet) {
        return res.status(404).json({ error: 'No such tweet' })
    }

    return res.status(200).json({ message: 'Repost deleted successfully' })

}


module.exports = {
    getReposts,
    repost,
    deleteRepost
}
