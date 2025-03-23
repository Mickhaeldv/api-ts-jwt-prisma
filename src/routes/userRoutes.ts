import express, { NextFunction, Request, Response } from 'express'
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/usersController'
import { validateToken } from '../services/auth.service'
import {jwtData} from '../types/globals'
const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'


interface CustomRequest extends Request {
    authotization?: jwtData
}

//Middleware de JWT para ver si estamos autenticados
const authenticateToken = (req: CustomRequest, _res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization

        if(!authorization || !authorization.startsWith('Bearer')) throw new Error('token not provided')

        const token = authorization.substring(7)
        const validation = validateToken(token)
        
        if(validation ===null) throw new Error('Invalid token')

        return next()

    } catch (err) {
        console.log((err as Error).message)
    }

}

router.post('/', authenticateToken, createUser)
router.get('/', authenticateToken, getAllUsers)
router.get('/:id', authenticateToken, getUserById)
router.put('/:id', authenticateToken, updateUser)
router.delete('/:id', authenticateToken,deleteUser)


export default router;