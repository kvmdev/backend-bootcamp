import express from 'express'
import { commentTweet, createTweet, getAllTweets, likeTweet } from './controllers/Tweet.js'
import { login, register } from './controllers/auth.js'
import dotenv from 'dotenv'
import { validateToken } from './middleware/auth.js'

dotenv.config()

const app = express()

app.use(express.json())

app.post('/login', login)

app.post('/register', register)

app.post('/tweet', validateToken, createTweet)

app.post('/tweet/:tweetId/:userId/like', likeTweet)

app.post('/tweet/:tweetId/:userId/comment', commentTweet)

app.get('/tweets', getAllTweets)

app.listen(3000, ()=> {
    console.log('http://localhost:3000')
})