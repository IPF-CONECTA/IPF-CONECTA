import axios from "axios"
import { authService } from "../../../auth/services/authService"

export const createExperience = async (experience, skills, username) => {
    const formattedExperience = {
        title: experience.title,
        description: experience.description,
        companyId: experience.company.value,
        contractTypeId: experience.contractType.value,
        modalityId: experience.modality.value,
        ubicationId: experience.location.value,
        ubicationType: experience.location.type,
        startDate: `01/${experience.startDateMonth}/${experience.startDateYear}`,
        endDate: experience.endDateMonth !== "null" ? `01/${experience.endDateMonth}/${experience.endDateYear}` : null,
        skills: skills
    }

    if (formattedExperience.endDate !== null) {
        if (Date.parse(formattedExperience.endDate) < Date.parse(formattedExperience.startDate)) {
            throw new Error("La fecha de fin no puede ser anterior a la fecha de inicio")
        }
    }
    const res = await axios.post(`http://localhost:4000/experience/${username}`, {
        experience: formattedExperience
    }, {
        headers: {
            Authorization: `Bearer ${authService.getToken()}`
        }
    })

    return res
}

export const updateExperience = async (experience, skills, username, experienceId) => {
    const formattedExperience = {
        title: experience.title,
        description: experience.description,
        companyId: experience.company.value,
        contractTypeId: experience.contractType.value,
        modalityId: experience.modality.value,
        ubicationId: experience.location.value,
        ubicationType: experience.location.type,
        startDate: `01/${experience.startDateMonth}/${experience.startDateYear}`,
        endDate: experience.endDateMonth !== "null" ? `01/${experience.endDateMonth}/${experience.endDateYear}` : null,
        skills: skills,
    };

    if (formattedExperience.endDate !== null) {
        if (Date.parse(formattedExperience.endDate) < Date.parse(formattedExperience.startDate)) {
            throw new Error("La fecha de fin no puede ser anterior a la fecha de inicio");
        }
    }
    const res = await axios.patch(`http://localhost:4000/experience/${username}/${experienceId}`, {
        experience: formattedExperience,
    }, {
        headers: {
            Authorization: `Bearer ${authService.getToken()}`,
        },
    });

    return res;
};