import { User } from "../models/user.interface"
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWN_SECRET || 'default-secret'

export const generateToken = (user: User): string => {
    return jwt.sign({id: user.id, email: user.email},JWT_SECRET,{expiresIn: '1h'} )
}

export const validateToken = (token: string)=>{
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET) as User
        return decodedToken
    } catch (err) {
        return null
    }
}