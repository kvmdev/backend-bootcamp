import express from 'express'
import { getAllUsers } from './controllers/Users'
import { createTweet, getAllTweets } from './controllers/Tweet'
import { login, register } from './controllers/auth'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())

app.post('/login', login)

app.post('/register', register)

app.get('/users', getAllUsers)

app.post('/tweet', createTweet)

app.get('/tweets', getAllTweets)

app.listen(3000)