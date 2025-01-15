import express from 'express'

const app = express()

/*

Usuarios
Tweets
Comentarios
Likes

*/

app.get('/saludar', function (req, res){
    res.send('Hola mundo')
})

app.listen(3000)