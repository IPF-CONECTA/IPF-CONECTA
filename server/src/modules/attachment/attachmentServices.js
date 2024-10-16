import { Attachment } from "./attachmentModel.js";

export const addAttachmentSvc = async (attachment, type) => {
    try {
        const newAttachment = await Attachment.create({
            ...attachment,
            attachmentType: type
        });
        return newAttachment;
    } catch (error) {
        throw new Error(error.message);
    }
}


export const getAttachmentsSvc = async (attachmentId) => {
    try {
        const attachments = await Attachment.findAll({
            where: {
                attachmentId
            }
        });
        return attachments;
    } catch (error) {
        throw new Error(error.message);
    }
}