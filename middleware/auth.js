import jwt from 'jsonwebtoken';

const SECRET_KEY = "secure-password";

export const validateToken = (req, res, next)=> {
    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        const decoded = jwt.verify(token, SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({message: 'Necesita un token', error})
    }
}