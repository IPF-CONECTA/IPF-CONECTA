import { City } from "../modules/ubications/models/cityModel.js"
import { Country } from "../modules/ubications/models/countryModel.js"
import { State } from "../modules/ubications/models/stateModel.js"

export const getLocationType = async (id, name) => {
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
}
export const getLocation = async (job) => {
    switch (job.locationType) {
        case 'city':
            job.dataValues.location = await City.findByPk(job.locationId, {
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
            job.dataValues.location = await State.findByPk(job.locationId, {
                attributes: ['name'],
                include: [{
                    model: Country,
                    attributes: ['name']
                }]
            });
            break;
        case 'country':
            job.dataValues.location = await Country.findByPk(job.locationId, {
                attributes: ['name']
            });
            break;
        default:
            job.dataValues.location = null;
    }
    return job
}

export const getAllLocations = async (jobs) => {

    for (let job of jobs) {
        switch (job.locationType) {
            case 'city':
                job.dataValues.location = await City.findByPk(job.locationId, {
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
                job.dataValues.location = await State.findByPk(job.locationId, {
                    attributes: ['name'],
                    include: [{
                        model: Country,
                        attributes: ['name']
                    }]
                });
                break;
            case 'country':
                job.dataValues.location = await Country.findByPk(job.locationId, {
                    attributes: ['name']
                });
                break;
            default:
                job.dataValues.location = null;
        }
    }
    return jobs;
}