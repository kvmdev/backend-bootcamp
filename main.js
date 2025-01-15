import express from "express"
import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient()
const app = express()
/*
susuarios
tweets
comentarios
likes
*/
/*app.get('/saludar', function (req,res){
    res.send("hola mundo")
}) 
app.post("/enviar", function (req,res){
    
})*/
/*
app.get ("/saludar", function (req,res){
    const nombre= req.query.nombre
    const edad = req.query.edad
    res.send("hola "+nombre+" tu edad es "+ edad)
}) 
    */
app.get ("/tweets", async function (req,res){
        const tweets = await prisma.tweet.findMany()
        res.json(tweets)
    })

app.listen(3000)
