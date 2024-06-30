import { transporter } from "../../../helpers/nodemailer.js"


export const sendConfirmAccount = async (to, confirmCode, names) => {
    const mailConfig = {
        from: '"IPF CONECTA" <ipfconecta@gmail.com>',
        to: to,
        subject: 'Confirmación de correo electrónico',
        html: `<!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Confirmación de Cuenta</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { width: 80%; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; }
                        .header { background-color: #4CAF50; color: white; padding: 10px; text-align: center; }
                        .field { margin-bottom: 10px; }
                        .content { padding: 20px; border: 1px solid #ddd; background-color: white; }
                        .value { margin-left: 10px; }
                        .label { font-weight: bold; }
                        .footer { margin-top: 20px; font-size: 0.9em; color: #777; text-align: center; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>Confirmación de Cuenta</h2>
                        </div>
                        <div class="content">
                            <p>Hola ${names},</p>
                            <p>Gracias por registrarte en IPF-CONECTA. Para completar tu registro, por favor confirma tu cuenta utilizando el siguiente código:</p>
                            <p style="font-size: 1.5em; text-align: center; font-weight: bold;">${confirmCode}</p>
                            <p>Ingresa este código en la página de confirmación para activar tu cuenta.</p>
                            <p>Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nuestro equipo de soporte.</p>
                            <p>Atentamente,</p>
                            <p>El Equipo de IPF-CONECTA</p>
                        </div>
                        <div class="footer">
                            <p>IPF-CONECTA &copy; 2024</p>
                        </div>
                    </div>
                </body>
                </html>

        `
    }
    try {
        await transporter.sendMail(mailConfig)
        console.log('Correo de confirmacion enviado')
    } catch (error) {
        throw new Error('Error al enviar el correo de confirmacion: ' + error)
    }
}
