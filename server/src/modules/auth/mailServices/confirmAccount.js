import { transporter } from "../../../helpers/nodemailer.js"


export const sendConfirmAccount = async (to, confirmCode, names) => {
    const mailConfig = {
        from: '"IPF CONECTA" <ipfconecta@gmail.com>',
        to: to,
        subject: 'Confirmación de correo electrónico',
        html: `
                <head>
                    <title>Contacto desde el formulario</title>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        .container { padding: 20px; }
                        .header { background-color: #f4f4f4; padding: 10px; text-align: center; }
                        .field { margin-bottom: 10px; }
                        .content { padding: 20px; border: 1px solid #ddd; }
                        .value { color: #666666; font-size: 16px; margin-bottom: 10px;}
                        .label {color: #333333; font-size: 24px; margin-bottom: 20px; font-weight: bold;}
                    </style>
                </head>
                    <body>
                        <div class='container'>
                            <div class='header'>
                                <h1>Confirma tu correo electrónico en IPF Conecta</h1>
                            </div>
                            <div class='content'>
                                <div class='field'>
                                    <h2 class='label'>Hola ${names}!</h2>
                                </div>
                                <div class='field'>
                                    <span class='value'>Gracias por registrarte. Por favor, confirma tu correo electrónico ingresando el siguiente código:</span>
                                </div>
                                <div class='field'>
                                    <span class='label'>${confirmCode}</span>
                                </div>
                            </div>
                        </div>
                </body>
        `
    }
    try {
        await transporter.sendMail(mailConfig)
        console.log('Correo de confirmacion enviado')
    } catch (error) {
        throw new Error('Error al enviar el correo de confirmacion: ' + error)
    }
}
