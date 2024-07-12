
export const sendNotifyChanges = async (to, change, changeDescription, names) => {
    const mailConfig = {
        from: '"IPF CONECTA" <ipfconecta@gmail.com>',
        to: to,
        subject: 'Confirmación de correo electrónico',
        html: ``
    }
}