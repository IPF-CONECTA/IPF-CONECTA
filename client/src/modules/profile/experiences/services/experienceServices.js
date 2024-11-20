import axios from "axios"
import { authService } from "../../../auth/services/authService"
import { BASE_URL } from "../../../../constants/BASE_URL"
export const createExperience = async (experience, skills, username) => {
    try {

        const formData = new FormData()
        formData.append("title", experience.title)
        formData.append("description", experience.description)
        formData.append("companyId", experience.company)
        formData.append("contractTypeId", experience.contractType.value)
        formData.append("modalityId", experience.modality.value)
        formData.append("locationId", experience.location.value)
        formData.append("locationType", experience.location.type)
        formData.append("startDate", `${experience.startDateMonth}/01/${experience.startDateYear}`)
        formData.append("endDate", experience.endDateMonth !== "" ? `${experience.endDateMonth}/01/${experience.endDateYear}` : null)

        if (experience.images?.length > 0) {
            experience.images.forEach((image) => {
                formData.append("images", image);
            });
        }

        if (skills.length > 0) {
            skills.forEach((skill) => {
                formData.append("skills", skill);
            });
        }
        if (formData.endDate !== null) {
            if (Date.parse(formData.endDate) < Date.parse(formData.startDate)) {
                throw new Error("La fecha de fin no puede ser anterior a la fecha de inicio")
            }
        }
        const res = await axios.post(`${BASE_URL}/experience/${username}`,
            formData
            , {
                headers: {
                    Authorization: `Bearer ${authService.getToken()}`
                }
            })

        return res
    } catch (error) {
        console.log(error)
    }
}

export const updateExperience = async (experience, skills, username, experienceId) => {
    const formattedExperience = {
        title: experience.title,
        description: experience.description,
        companyId: experience.company.value,
        contractTypeId: experience.contractType.value,
        modalityId: experience.modality.value,
        locationId: experience.location.value,
        locationType: experience.location.type,
        startDate: `01/${experience.startDateMonth}/${experience.startDateYear}`,
        endDate: experience.endDateMonth !== "null" ? `01/${experience.endDateMonth}/${experience.endDateYear}` : null,
        skills: skills,
    };

    if (formattedExperience.endDate !== null) {
        if (Date.parse(formattedExperience.endDate) < Date.parse(formattedExperience.startDate)) {
            throw new Error("La fecha de fin no puede ser anterior a la fecha de inicio");
        }
    }
    const res = await axios.patch(`${BASE_URL}/experience/${username}/${experienceId}`, {
        experience: formattedExperience,
    }, {
        headers: {
            Authorization: `Bearer ${authService.getToken()}`,
        },
    });

    return res;
};