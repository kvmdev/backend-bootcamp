import express from 'express'

const app = express()

/*
Usuario
Tweet
Comentario
Likes

*/

app.get('/saludar', function(req, res) {
    res.send('Hola Mundo')
})

app.listen(3000)