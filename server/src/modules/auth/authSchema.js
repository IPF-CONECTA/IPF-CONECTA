import { body } from "express-validator";
export const authLoginSchema = [
    body('user.email')
        .notEmpty()
        .withMessage('Ingrese el email o username'),
    body('user.password')
        .notEmpty()
        .withMessage('Ingrese la contraseña')
]

export const authRegisterSchema = [
    body('user.username')
        .notEmpty()
        .withMessage('El nombre de usuario es requerido')
        .isString()
        .withMessage('El nombre de usuario debe ser una cadena de texto')
        .custom(value => !/\s/.test(value))
        .withMessage('El nombre de usuario no debe tener espacios')
    ,
    body('user.email')
        .isEmail()
        .withMessage('El email es requerido'),
    body('user.password')
        .notEmpty()
        .isStrongPassword({
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })
        .isString()
        .withMessage('La contraseña no cumple con los requisitos minimos'),
    body('user.cuil')
        .if(body('user.role').equals('student'))
        .notEmpty().withMessage('Ingrese su CUIL')
        .isNumeric().withMessage('El CUIL debe ser numerico')
        .isLength({ min: 11, max: 11 }).withMessage('El CUIL debe tener 11 digitos'),
    body('user.names')
        .notEmpty()
        .withMessage('Ingrese su nombre'),
    body('user.surnames')
        .notEmpty()
        .withMessage('Ingrese su apellido'),
    body('user.role')
        .notEmpty()
        .isIn(['student', 'recruiter'])
        .withMessage('El rol es incorrecto')
]

export const authUsernameSchema = [
    body('username')
        .notEmpty()
        .withMessage('El nombre de usuario es requerido')
        .isString()
        .withMessage('El nombre de usuario debe ser una cadena de texto')
        .custom(value => !/\s/.test(value))
        .withMessage('El nombre de usuario no debe tener espacios')
]