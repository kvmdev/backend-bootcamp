import express from 'express'
import { getAllUsers } from './controllers/Users'
import { commentTweet, createTweet, getAllTweets, likeTweet } from './controllers/Tweet'
import { login, register } from './controllers/auth'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())

app.post('/login', login)

app.post('/register', register)

app.post('/tweet/:tweetId/:userId/like', likeTweet)

app.post('/tweet/:tweetId/:userId/comment', commentTweet)

app.post('/tweet', createTweet)

app.get('/tweets', getAllTweets)

app.listen(3000)