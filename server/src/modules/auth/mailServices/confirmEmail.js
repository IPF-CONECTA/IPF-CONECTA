import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
})

export const sendConfirmEmail = async (to, confirmCode, names) => {
    const mailConfig = {
        from: '"IPF CONECTA" <ipfconecta@gmail.com>',
        to: to,
        subject: 'Confirmacion de correo electronico',
        html: `
            <h1>Confirmación de Correo Electrónico</h1>
            <h2>Hola, ${names}</h2>
            <p>Gracias por registrarte. Por favor, confirma tu correo electrónico ingresando el siguiente código:</p>
            <p style="font-weight: bold;">${confirmCode}</p>
            <p>¡Gracias!</p>
        `    }
    try {
        await transporter.sendMail(mailConfig)
        console.log('Correo de confirmacion enviado')
    } catch (error) {
        throw new Error('Error al enviar el correo de confirmacion: ' + error)
    }
}
