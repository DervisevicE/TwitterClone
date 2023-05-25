const { default: mongoose } = require('mongoose')
const Tweet = require('../models/tweetModel')
const User = require('../models/userModel')
const Bookmark = require('../models/bookmarkModel')

const getBookmarks = async (req, res) => {
  try {
    const id = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such user' });
    }

    const bookmarks = await Bookmark.find({ user: id }).sort({ createdAt: -1 });

    res.json(bookmarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const bookmark = async (req, res) => {
  const id = req.user._id;
  const { tweet } = req.body;

  const exists = await Bookmark.findOne({ user: id, tweet: tweet });
  if (exists) {
    return res.status(400).json({ error: 'You already bookmarked this tweet' });
  }
  try {
    const bookmark = await Bookmark.create({ user: id, tweet: tweet });
    const twt = await Tweet.findById(tweet);

    if (!twt) {
      return res.status(404).json({ error: 'No such tweet' });
    }

    twt.bookmarks.push(bookmark._id);
    await twt.save();

    res.status(200).json(bookmark);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};

const removeBookmark = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such bookmark' });
  }

  const bookmark = await Bookmark.findByIdAndDelete(id);

  if (!bookmark) {
    return res.status(404).json({ error: 'No such bookmark' });
  }

  const tweet = await Tweet.findByIdAndUpdate(
    bookmark.tweet,
    { $pull: { bookmarks: bookmark._id } },
    { new: true })

    if(!tweet) {
      return res.status(404).json({error: 'No such tweet'})
    }

  res.status(200).json({message: 'Bookmark removed successfully'});
};

module.exports = {
  getBookmarks,
  bookmark,
  removeBookmark
}