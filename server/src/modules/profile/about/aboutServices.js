import { Profile } from "../profileModel.js"

export const updateAbout = async (profileId, about) => {
    try {
        const newAbout = await Profile.update({ about }, {
            where: {
                id: profileId
            }
        })
        return newAbout
    } catch (error) {
        return error
    }
}

export const deleteAbout = async (profileId) => {
    try {
        const deletedAbout = await Profile.update({ about: null }, {
            where: {
                id: profileId
            }
        })
        return deletedAbout
    } catch (error) {
        return error
    }
}