import { getProfileByUsername } from "./profileServices.js"

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
