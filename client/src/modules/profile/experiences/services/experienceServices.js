export const createExperience = async (experience) => {
    const formattedExperience = {
        title: experience.title,
        description: experience.description,
        companyId: experience.company.value,
        contractTypeId: experience.contractType.value,
        ubicationId: experience.location.value,
        ubicationType: experience.location.type,
        startDate: `01/${experience.startDateMonth}/${experience.startDateYear}`,
        endDate: experience.endDateMonth ? `01/${experience.endDateMonth}/${experience.endDateYear}` : null
    }

    console.log(formattedExperience)
}