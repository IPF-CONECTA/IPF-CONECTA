import { isEmailAvailable, isUsernameAvailable } from "../users/userServices.js";
import { getProfileByUsername, updateProfileSvc } from "./profileServices.js"

export const getProfileByUsernameCtrl = async (req, res) => {
    const { id: reqId } = req.user.profile;
    const { username } = req.params
    try {
        const response = await getProfileByUsername(reqId, username)
        if (!res) return res.status(404).json()
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error interno en el servidor" })
    }

}

export const updateProfileCtrl = async (req, res) => {
    const { id: profileId } = req.user.profile
    const { id: userId } = req.user
    try {
        if (!await isEmailAvailable(req.body.email, userId)) return res.status(400).json({ message: "El email ya esta en uso" })
        if (!await isUsernameAvailable(req.body.username, userId)) return res.status(400).json({ message: "El username ya esta en uso" })
        const updatedProfile = await updateProfileSvc(profileId, req.body)
        if (!updatedProfile || updatedProfile.length < 1) return res.status(400).json({ message: "No se pudo actualizar el perfil" })
        res.status(201).json()
    } catch (error) {
        res.status(500).json({ message: "Error interno en el servidor" })
    }
}