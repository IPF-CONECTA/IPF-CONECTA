import { transporter } from "../../../../helpers/nodemailer.js"


export const emailCompanyVinculationApproved = async (to, name) => {
    const mailConfig = {
        from: 'ipfconecta@gmail.com',
        to: to,
        subject: subject,
        html: `<!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
                            <h2>Vinculación con ${companyName} Aprobada</h2>
                        </div>
                        <div class="content">
                            <p>Hola ${name},</p>
                            <p>Nos complace informarte que tu solicitud de vinculación con ${companyName} ha sido aprobada.</p>
                            <p>Ahora puedes gestionar tus actividades y publicar ofertas laborales en nombre de ${companyName} en nuestra plataforma.</p>
                            <p>Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en ponerte en contacto con nuestro equipo de soporte.</p>
                            <p>Atentamente,</p>
                            <p>El Equipo de IPF-CONECTA</p>
                        </div>
                        <div class="footer">
                            <p>IPF-CONECTA &copy; 2024</p>
                        </div>
                    </div>
                </body>
                </html>`
    }
    try {
        await transporter.sendMail(mailConfig)
        console.log('Correo de aprobacion de cuenta enviado')
    } catch (error) {
        throw new Error('Error al enviar el correo de aprobacion de cuenta: ' + error)
    }
}



export const emailCompanyVinculationDeclined = async (to, name, companyName) => {
    const mailConfig = {
        from: 'ipfconecta@gmail.com',
        to: to,
        subject: subject,
        html: `<!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { width: 80%; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; }
                        .header { background-color: #f44336; color: white; padding: 10px; text-align: center; }
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
                            <h2>Vinculacion con ${companyName} Rechazado</h2>
                        </div>
                        <div class="content">
                            <p>Hola ${name},</p>
                            <p>Lamentamos informarte que la vinculación de tu perfil con ${companyName} ha sido rechazada. Esto puede deberse a que la información proporcionada no cumplía con nuestros criterios de verificación.</p>
                            <p>Si crees que esto es un error o tienes preguntas sobre el proceso de verificación, por favor, ponte en contacto con nuestro equipo de soporte para obtener más detalles.</p>
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
        console.log('Correo de rechazo de vinculacion de compania enviado')
    } catch (error) {
        throw new Error('Error al enviar el correo de vinculacion de compania: ' + error)
    }
}


export const emailCompanyDeclined = async (to, name, companyName) => {
    const mailConfig = {
        from: 'ipfconecta@gmail.com',
        to: to,
        subject: 'Registro Rechazado',
        html: `<!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Registro de Compañía Rechazado</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { width: 80%; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; }
                        .header { background-color: #f44336; color: white; padding: 10px; text-align: center; }
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
                            <h2>Registro de Compañía Rechazado</h2>
                        </div>
                        <div class="content">
                            <p>Hola ${name},</p>
                            <p>Lamentamos informarte que la compañía ${companyName} que intentaste registrar ha sido rechazada. Esto puede deberse a que la información proporcionada no cumplía con nuestros criterios de verificación.</p>
                            <p>Si crees que esto es un error o tienes preguntas sobre el proceso de verificación, por favor, ponte en contacto con nuestro equipo de soporte para obtener más detalles.</p>
                            <p>Atentamente,</p>
                            <p>El Equipo de IPF-CONECTA</p>
                        </div>
                        <div class="footer">
                            <p>IPF-CONECTA &copy; 2024</p>
                        </div>
                    </div>
                </body>
                </html>
`}
    try {
        await transporter.sendMail(mailConfig)
        console.log('Correo de rechazo de compania enviado')
    } catch (error) {
        throw new Error('Error al enviar el correo de rechazo de compania: ' + error)
    }
}

export const emailCompanyApproved = async (to, name, companyName) => {
    const mailConfig = {
        from: 'ipfconecta@gmail.com',
        to: to,
        subject: 'Registro Aprobado',
        html: `<!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Registro de Compañía Aprobado</title>
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
                            <h2>Registro de Compañía Aprobado</h2>
                        </div>
                        <div class="content">
                            <p>Hola ${name},</p>
                            <p>Nos complace informarte que tu solicitud de registro de la compañía ${companyName} ha sido aprobada.</p>
                            <p>Ahora puedes gestionar tus actividades y publicar ofertas laborales en nombre de ${companyName} en nuestra plataforma.</p>
                            <p>Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en ponerte en contacto con nuestro equipo de soporte.</p>
                            <p>Atentamente,</p>
                            <p>El Equipo de IPF-CONECTA</p>
                        </div>
                        <div class="footer">
                            <p>IPF-CONECTA &copy; 2024</p>
                        </div>
                    </div>
                </body>
                </html>
`}
}