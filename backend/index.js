require('dotenv').config()
const express = require('express')
const tweetRoutes = require('./routes/tweets')
const userRoutes = require('./routes/users')
const commentRoutes = require('./routes/comments')
const likeRoutes = require('./routes/likes')
const repostRoutes = require('./routes/reposts')
const bookmarkRoutes = require('./routes/bookmarks')
const mongoose = require('mongoose')
const cors = require('cors')
const jwtGuard = require('./middleware/auth');
const Notification = require('./models/notificationModel');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/tweets', jwtGuard, tweetRoutes);
app.use('/user', userRoutes)
app.use('/comments', commentRoutes)
app.use('/likes', jwtGuard, likeRoutes)
app.use('/reposts', repostRoutes)
app.use('/bookmarks', jwtGuard, bookmarkRoutes)

app.get('/notifications', jwtGuard, function (req, res) {
    const id = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' });
    }

    Notification.find({ user: id })
        .sort({ createdAt: -1 })
        .then(notifications => {
            res.status(202).json(notifications);
        }).catch(error => {
            res.status(500).json({ error: 'An error occurred while fetching notifications' });
        });
});


app.get('/', function (req, res) {
    res.json({ mssg: "Hello this is working" })
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        const server = app.listen(8000, function () {
            const host = server.address().address
            const port = server.address().port
            console.log("App connceted to database & listening at http://%s", port)
        })
    })
    .catch((error) => {
        console.log(error)
    })
