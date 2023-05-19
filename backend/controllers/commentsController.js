const { default: mongoose } = require('mongoose')
const Tweet = require('../models/tweetModel')
const User = require('../models/userModel')
const Comment = require('../models/commentModel')

const createComment = async (req, res) => {
    const { content, tweet } = req.body;
    const id = req.user._id;

    try {
        const comment = await Comment.create({ content: content, author: id, tweet: tweet });

        const twt = await Tweet.findById(tweet);

        if (!twt) {
            return res.status(404).json({ error: 'No such tweet' });
        }

        twt.comments.push(comment._id);

        await twt.save();

        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getComments = async (req, res) => {
    const { tweetId } = req.params

    if (!mongoose.Types.ObjectId.isValid(tweetId)) {
        return res.status(404).json({ error: 'No such tweet' })
    }

    const tweet = await Tweet.findById({ _id: tweetId })

    if (!tweet) {
        return res.status(404).json({ error: 'No such tweet' })
    }

    const commentsIds = tweet.comments

    const comments = await Comment.find({ _id: { $in: commentsIds } })

    if (!comments) {
        return res.status(404).json({ error: 'ERROR' })
    }

    res.status(200).json(comments)

}

const deleteComment = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such comment' })
    }

    const comment = await Comment.findByIdAndDelete(id)

    if (!comment) {
        return res.status(404).json({ error: 'No such comment 2' })
    }

    const tweet = await Tweet.findByIdAndUpdate(
        comment.tweet,
        { $pull: { comments: comment._id } },
        { new: true }
      );

    if (!tweet) {
        return res.status(404).json({ error: 'No such tweet' })
    }

    return res.status(200).json({ message: 'Comment deleted successfully' })
}

const getCommentById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such comment' })
    }

    const comment = await Comment.findById(id)

    if (!comment) {
        return res.status(404).json({ error: 'No such comment' })
    }

    return res.status(200).json(comment)
}

module.exports = {
    createComment,
    getComments,
    deleteComment,
    getCommentById
}