import { transporter } from '../../../helpers/nodemailer.js'

export const sendRecoverPasswordEmail = async (to, confirmCode, names) => {
    const mailConfig = {
        from: '"IPF CONECTA" <ipfconecta@gmail.com>',
        to: to,
        subject: 'Recuperación de contraseña | IPF CONECTA',
        html: `
            <h1>Recuperación de contraseña</h1>
            <h2>Hola, ${names}</h2>
            <p>Has solicitado recuperar tu contraseña. Para continuar, ingresa el siguiente código de confirmación:</p>
            <p style="font-weight: bold;">${confirmCode}</p>
            <p>Si no has solicitado esta recuperación, puedes ignorar este correo.</p>
        `
    }
    try {
        await transporter.sendMail(mailConfig)
        console.log('Correo enviado')
    } catch (error) {
        throw new Error('Error al enviar el correo: ' + error)
    }
}