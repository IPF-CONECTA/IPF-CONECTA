import { getProfileById } from "./profileServices.js"

export const getProfileByIdCtrl = async (req, res) => {
    const { id } = req.user.profile;
    const { profileId } = req.params
    try {
        const profile = await getProfileById(id, profileId)

        if (!profile) return res.status(404).json()

        res.status(200).json(profile)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error interno en el servidor" })
    }

}