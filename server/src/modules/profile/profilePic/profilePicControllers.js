import { resizeImage } from "../../../helpers/resizeImages.js";
import { updateBannerSvc, updatePfpSvc } from "../profileServices.js";

export const updateProfilePicCtrl = async (req, res) => {
    const { id } = req.user.profile
    try {
        if (!req.file) return res.status(404).json()
        const image = await resizeImage(req.file.filename, "images", 200, 200)
        const updatedPfp = await updatePfpSvc(image, id)
        if (!updatedPfp) return res.status(400).json(updatedPfp)
        res.status(201).json(updatedPfp)
    } catch (error) {
        console.log(error)
        res.status(500).json()
    }
}

export const updateBannerCtrl = async (req, res) => {
    const { id } = req.user.profile
    try {
        if (!req.file) return res.status(400).json()
        const image = await resizeImage(req.file.filename, "images", 200, 200)
        const updatedBanner = await updateBannerSvc(image, id)
        if (!updatedBanner) return res.status(400).json()
        res.status(201).json()
    } catch (error) {
        console.log(error)
        res.status(500).json()
    }
}