import express from 'express'

const app = express()

/*
Usuario 
Tweets
Comentarios
Likes

*/

app.get('/saludar', function(req, res){
    res.send('Hola, en que puedo ayudarte')
} )

app.listen (3000)