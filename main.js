import express from 'express'
import {PrismaClient} from '@prisma/client'


const prisma = new PrismaClient()

const app = express()

/*
Usuario 
Tweets
Comentarios
Likes

*/

app.get('/tweet', async function (req, res) {
    const Tweets = await prisma.tweet.findMany()
    res.json(Tweets)
    
    
})

app.listen (3000)