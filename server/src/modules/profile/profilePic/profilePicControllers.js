import { resizeImage } from "../../../helpers/resizeImages.js";
import { updatePfpSvc } from "../profileServices.js";

export const updateProfilePicCtrl = async (req, res) => {
    const { id } = req.user.profile
    try {
        if (!req.file) return res.status(400).json()
        const image = await resizeImage(req.file.filename, "images", 200, 200)
        const updatedPfp = await updatePfpSvc(image, id)
        if (!updatedPfp) return res.status(400).json()
        res.status(201).json()
    } catch (error) {
        console.log(error)
        res.status(500).json()
    }
}