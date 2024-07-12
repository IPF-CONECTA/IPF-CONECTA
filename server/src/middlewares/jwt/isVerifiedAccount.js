import jwt from 'jsonwebtoken'
import { User } from '../../modules/users/userModel.js'
import { getUserById } from '../../modules/users/userServices.js'

export const isVerifiedAccount = async (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token) throw new Error('Inicie sesion para continuar')
        const { userId } = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        const verified = await User.findByPk(userId, {
            attributes: ['verified']
        })
        if (!verified) {
            throw new Error('Confirme su correo electronico para continuar')
        }
        next()
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}
export const isToken = async (req, res, next) => {
    try {
        const { token } = req.headers

        if (!token) throw new Error('Inicie sesion para continuar')
        const { userId } = jwt.verify(JSON.parse(token), process.env.TOKEN_SECRET_KEY)

        const isUser = await getUserById(userId)
        if (!isUser) {
            throw new Error('Error al verificar el token, inicie sesion nuevamente')
        }
        req.user = isUser
        next()
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}