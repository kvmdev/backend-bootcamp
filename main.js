import express from 'express'
import { commentTweet, createTweet, getAllTweets, likeTweet, getComment, getTweet } from './controllers/Tweet.js'

import { login, register } from './controllers/auth.js'
import dotenv from 'dotenv'
import { validateToken } from './middleware/auth.js'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.post('/login', login)

app.post('/register', register)

app.post('/tweet', validateToken, createTweet)

app.post('/tweet/:tweetId/like', validateToken, likeTweet)

app.post('/tweet/:tweetId/comment', validateToken, commentTweet)

app.get('/tweets', validateToken, getAllTweets)

app.get('/comments/:tweetId', validateToken, getComment)

app.get('/tweet/:id', validateToken, getTweet)



module.exports = app;
