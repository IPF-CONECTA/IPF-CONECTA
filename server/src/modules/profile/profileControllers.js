import { getProfileByUsername } from "./profileServices.js"

export const getProfileByIdCtrl = async (req, res) => {
    const { id } = req.user.profile;
    const { username } = req.params
    try {
        const response = await getProfileByUsername(id, username)
        if (!res) return res.status(404).json()
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error interno en el servidor" })
    }

}

