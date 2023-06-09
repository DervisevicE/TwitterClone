const { default: mongoose } = require('mongoose')
const User = require('../models/userModel')
const Notification = require('../models/notificationModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}


const signupUser = async (req, res) => {
    const { username, email, password, profilePicture } = req.body
    try {
        const user = await User.signup(username, email, password, profilePicture)

        const token = createToken(user._id)


        res.status(202).json({ username, token })
    } catch (error) {
        res.status(404).json({ mssg: error.message })
    }
}

const loginUser = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const user = await User.login(username, email, password)

        const token = createToken(user._id)

        res.status(202).json({ username, token })
    } catch (error) {
        console.log(error);
        res.status(404).json({ mssg: error.message })
    }
}

const getUser = async (req, res) => {
    const id = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }

    const user = await User.findById({ _id: id })

    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }
    res.status(202).json(user)

}
const updateUserDetails = async (req, res) => {
    const id = req.user._id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }

    const user = await User.findByIdAndUpdate({ _id: id }, { ...req.body })

    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }
    res.status(202).json(user)
}

const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }

    const user = await User.findByIdAndDelete({ _id: id })

    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }

    res.status(200).json(user)
}

const getFollowers = async (req, res) => {
    const id = req.user._id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }

    const user = await User.findById({ _id: id })

    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }

    const followersIds = user.followers

    const followers = await User.find({ _id: { $in: followersIds } })

    if (!followers) {
        return res.status(404).json({ error: 'ERROR' })
    }
    return res.status(202).json(followers)
}

const getFollowing = async (req, res) => {
    const id = req.user._id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }

    const user = await User.findById({ _id: id })

    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }

    const followingsIds = user.following

    const following = await User.find({ _id: { $in: followingsIds } })

    if (!following) {
        return res.status(404).json({ error: 'ERROR' })
    }

    res.status(200).json(following)

}

const followUser = async (req, res) => {
    const id = req.user._id
    const { followId } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }

    if (!mongoose.Types.ObjectId.isValid(followId)) {
        return res.status(404).json({ error: 'No such user' })
    }

    const user = await User.findById({ _id: id })

    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }

    const follow = await User.findById({ _id: followId })

    if (!follow) {
        return res.status(404).json({ error: 'No such user' })
    }

    user.following.push(follow)
    follow.followers.push(user)

    await user.save()
    await follow.save()

    const notification = new Notification({
        user: followId,
        sender: id,
        message: `${user.username} started following you.`,
    });

    await notification.save();

    res.status(200).json({ message: 'User followed successfully' })
}

const unfollowUser = async (req, res) => {
    const id = req.user._id;
    const { unfollowId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' });
    }

    if (!mongoose.Types.ObjectId.isValid(unfollowId)) {
        return res.status(404).json({ error: 'No such user' });
    }

    const user = await User.findById({ _id: id });

    if (!user) {
        return res.status(404).json({ error: 'No such user' });
    }

    const unfollow = await User.findById({ _id: unfollowId });

    if (!unfollow) {
        return res.status(404).json({ error: 'No such user' });
    }

    user.following = user.following.filter((follows) => follows._id.toString() !== unfollowId);

    unfollow.followers = unfollow.followers.filter((follows) => follows._id.toString() !== id);

    await user.save();
    await unfollow.save();

    res.status(200).json({ message: 'User unfollowed successfully' });
};

const getRandomUsers = async (req, res) => {
    const id = req.user._id;

    try {
        const user = await User.findById(id);
        const followingIds = user.following.map((follow) => follow._id);

        const randomUsers = await User.aggregate([
            { $match: { _id: { $ne: id, $nin: followingIds } } },
            { $sample: { size: 5 } },
        ]);

        const randomFilteredUsers = randomUsers.filter(
            (user) => user._id.toString() !== id && !followingIds.includes(user._id)
        );

        console.log(randomFilteredUsers);
        res.status(200).json(randomFilteredUsers);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching random users' });
    }
};


const getUserById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such user' })
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(404).json({ error: 'No such user' })
        }


        const user = await User.findById({ _id: id })

        if (!user) {
            return res.status(404).json({ error: 'No such user' })
        }
        res.status(202).json(user)


    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching random users' });
    }
}


module.exports = {
    signupUser,
    loginUser,
    getUser,
    updateUserDetails,
    deleteUser,
    getFollowers,
    getFollowing,
    followUser,
    unfollowUser,
    getRandomUsers,
    getUserById,

}