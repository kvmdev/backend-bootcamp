import express from 'express'
import { PrismaClient } from '@prisma/client'
import session from 'express-session'
import { createTweet, getTweets, likeTweet } from './Controllers/TweetController.js'
import { getUsuarios, login, registrar } from './Controllers/UserController.js'

const app = express()

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, naxAge: 60000 }
}))

app.get('/usuarios', getUsuarios)

app.get('/user', registrar)

app.get('/tweet', createTweet)

app.get('/tweets', getTweets)

app.get('/tweet/:id/like', likeTweet)

app.get('/login' , login)

app.listen(3000)