import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const resizeImage = async (filePath, storage, width, height) => {
    const uploadPath = path.join(__dirname, `../../uploads/${storage}`);
    const fullFilePath = path.join(uploadPath, path.basename(filePath));
    const tempFileName = `temp_${path.basename(filePath)}`;
    const tempFilePath = path.join(uploadPath, tempFileName);

    try {
        await fs.access(fullFilePath);

        await sharp(fullFilePath)
            .resize(width, height)
            .toFile(tempFilePath);

        await fs.rename(tempFilePath, fullFilePath);

        return path.basename(fullFilePath);
    } catch (error) {
        console.log(error);
        throw new Error('Error resizing image');
    }
};