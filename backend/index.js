require('dotenv').config()
const express = require('express')
const tweetRoutes = require('./routes/tweets')
const userRoutes = require('./routes/users')
const commentRoutes = require('./routes/comments')
const likeRoutes = require('./routes/likes')
const repostRoutes = require('./routes/reposts')
const mongoose = require('mongoose')
const cors = require('cors')
const jwtGuard = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/tweets', jwtGuard, tweetRoutes);
app.use('/user', userRoutes)
app.use('/comments', commentRoutes)
app.use('/likes', jwtGuard, likeRoutes)
app.use('/reposts', repostRoutes)

app.get('/', function (req, res) {
    res.json({ mssg: "Hello this is working" })
})

// app.get('/tweets', function (req, res) {
//     res.json([{
//         "id": "1",
//         "user": "First Last",
//         "username": "@first.last",
//         "content": "This is my new tweet",
//         "likes": 125,
//         "comments": 158,
//         "reposts": 55
//     },
//     {
//         "id": "2",
//         "user": "First Second",
//         "username": "@first.second",
//         "content": "This is my new second tweet",
//         "likes": 25,
//         "comments": 58,
//         "reposts": 5
//     },]);
// });

// app.post('/tweets', function (req, res) {
//     res.json(
//         {
//             "id": "1",
//             "user": "First Last",
//             "username": "@first.last",
//             "content": "This is my tweet",
//             "likes": 125,
//             "comments": 158,
//             "reposts": 55
//         });
// });

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
