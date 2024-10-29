import { Attachment } from "./attachmentModel.js";


export const createAttachmentsSvc = async (attachmentableId, attachments, attachmentableType, t) => {
    try {
        if (attachments.length > 0) {
            await Promise.all(attachments.map(attachment => {
                return Attachment.create({ attachmentableId, attachmentableType, url: attachment.filename, docType: attachment.mimetype }, { transaction: t })
            }));
        }
    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
}


export const getAttachmentsSvc = async (attachmentableId) => {
    try {
        const attachments = await Attachment.findAll({
            where: {
                attachmentableId
            }
        });
        return attachments;
    } catch (error) {
        throw new Error(error.message);
    }
}