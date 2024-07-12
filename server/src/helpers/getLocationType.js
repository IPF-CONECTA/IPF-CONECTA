import { City } from "../modules/ubications/models/cityModel.js"
import { Country } from "../modules/ubications/models/countryModel.js"
import { State } from "../modules/ubications/models/stateModel.js"

export const getLocationType = async (id, name) => {
    try {
        if (!id || !name) throw new Error('Ingrese la ubicacion de la empresa')

        const city = await City.findOne({
            where: {
                id: id,
                name: name
            }
        })
        if (city) return 'city'
        else {
            const state = await State.findOne({
                where: {
                    id: id,
                    name: name
                }
            })
            if (state) return 'state'
            else {
                const country = await Country.findAll({
                    where: {
                        id: id,
                        name: name
                    }
                })
                if (country) return 'country'
                else {
                    throw new Error('Error al seleccionar la ubicacion')
                }
            }

        }
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getLocation = async (jobOrCompany) => {
    switch (jobOrCompany.locationType) {
        case 'city':
            jobOrCompany.dataValues.location = await City.findByPk(jobOrCompany.locationId, {
                attributes: ['name'],
                include: [{
                    model: State,
                    attributes: ['name'],
                    include: [{
                        model: Country,
                        attributes: ['name']
                    }]
                }]
            });
            break;
        case 'state':
            jobOrCompany.dataValues.location = await State.findByPk(jobOrCompany.locationId, {
                attributes: ['name'],
                include: [{
                    model: Country,
                    attributes: ['name']
                }]
            });
            break;
        case 'country':
            jobOrCompany.dataValues.location = await Country.findByPk(jobOrCompany.locationId, {
                attributes: ['name']
            });
            break;
        default:
            jobOrCompany.dataValues.location = null;
    }
    return jobOrCompany
}

export const getAllLocations = async (jobsOrCompanies) => {

    for (let jobOrCompany of jobsOrCompanies) {
        switch (jobOrCompany.locationType) {
            case 'city':
                jobOrCompany.dataValues.location = await City.findByPk(jobOrCompany.locationId, {
                    attributes: ['name'],
                    include: [{
                        model: State,
                        attributes: ['name'],
                        include: [{
                            model: Country,
                            attributes: ['name']
                        }]
                    }]
                });
                break;
            case 'state':
                jobOrCompany.dataValues.location = await State.findByPk(jobOrCompany.locationId, {
                    attributes: ['name'],
                    include: [{
                        model: Country,
                        attributes: ['name']
                    }]
                });
                break;
            case 'country':
                jobOrCompany.dataValues.location = await Country.findByPk(jobOrCompany.locationId, {
                    attributes: ['name']
                });
                break;
            default:
                jobOrCompany.dataValues.location = null;
        }
    }
    return jobsOrCompanies;
}