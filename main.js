import express from "express"

const app = express()
/*
susuarios
tweets
comentarios
likes
*/
app.get('/saludar', function (req,res){
    res.send("hola mundo")
}) 
app.listen(3000)


