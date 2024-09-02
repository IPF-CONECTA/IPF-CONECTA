import { getProfileSvc } from "./profileServices.js"

export const getProfile = async (req, res) => {
    const { id } = req.user.profile;
    try {
        const profile = await getProfileSvc(id)

        if (!profile) return res.status(404).json()

        res.status(200).json(profile)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error interno en el servidor" })
    }

}