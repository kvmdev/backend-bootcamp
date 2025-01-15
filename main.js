import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma=new PrismaClient()
const app = express()

/*
Usuarios , tweets ,conversacion , likes
*/
/*
app.get('/saludar',function(req,res){
    res.send('Hola mundo')
})
*/
app.get('/tweet', async function(req,res){
    const tweets=await prisma.tweet.findMany()
    res.json(tweets)
})
app.listen(3000)

