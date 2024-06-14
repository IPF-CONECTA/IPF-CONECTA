import { sendContactCompany } from "./mailServices/contactCompany.js";

export const sendContactCompanyCtrl = async (req, res) => {
    const { from, name, subject, message } = req.body;
    try {
        await sendContactCompany(from, name, subject, message)
        res.status(200).json({ message: 'Correo enviado correctamente' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

