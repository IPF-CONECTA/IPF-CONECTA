import { transporter } from "../../../helpers/nodemailer.js"


export const sendContactCompany = async (from, name, subject, message) => {
    if (!from || !name || !subject || !message) {
        throw new Error('Rellene los campos para continuar')
    }
    const mailConfig = {
        from: from,
        to: 'ipfconecta@gmail.com',
        subject: subject,
        html: `<head>
                    <title>Contacto desde el formulario</title>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        .container { padding: 20px; }
                        .header { background-color: #f4f4f4; padding: 10px; text-align: center; }
                        .field { margin-bottom: 10px; }
                        .content { padding: 20px; border: 1px solid #ddd; }
                        .value { margin-left: 10px; }
                        .label { font-weight: bold; }
                        </style>
                </head>
                <body>
                    <div class='container'>
                    <div class='header'>
                        <h2>Nuevo mensaje de contacto</h2>
                    </div>
                        <div class='content'>
                            <div class='field'>
                                <span class='label'>Nombre:</span><span class='value'>${name}</span>
                            </div>
                            <div class='field'>
                                <span class='label'>Correo Electrónico:</span><span class='value'>${from}</span>
                            </div>
                            <div class='field'>
                                <span class='label'>Asunto:</span><span class='value'>${subject}</span>
                            </div>
                            <div class='field'>
                                <span class='label'>Mensaje:</span>
                                <div class='value'>${message}</div>
                            </div>
                        </div>
                    </div>
                </body>`
    }
    try {
        await transporter.sendMail(mailConfig)
        console.log('Correo de confirmacion enviado')
    } catch (error) {
        throw new Error('Error al enviar el correo de confirmacion: ' + error)
    }
}