import { transporter } from '../../../helpers/nodemailer.js'

export const sendRecoverPasswordEmail = async (to, confirmCode, names) => {
    const mailConfig = {
        from: '"IPF CONECTA" <ipfconecta@gmail.com>',
        to: to,
        subject: 'Recuperación de contraseña | IPF CONECTA',
        html: `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Recuperación de contraseña</title>
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
                            <h1>Recuperación de contraseña en IPF Conecta</h1>
                        </div>
                        <div class='content'>
                            <div class='field'>
                                <h2 class='label'>Hola, ${names}!</h2>
                            </div>
                            <div class='field'>
                                <span class='value'>Has solicitado recuperar tu contraseña. Para continuar, ingresa el siguiente código de confirmación:</span>
                            </div>
                            <div class='field'>
                                <span class='label'>${confirmCode}</span>
                            </div>
                            <div class='field'>
                                <span class='value'>Si no has solicitado esta recuperación, puedes ignorar este correo.</span>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        `
    }
    try {
        await transporter.sendMail(mailConfig)
        console.log('Correo enviado')
    } catch (error) {
        throw new Error('Error al enviar el correo: ' + error)
    }
}