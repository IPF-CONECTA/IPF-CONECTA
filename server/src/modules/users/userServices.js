import { User } from './userModel.js'
import { ALL_ROLES } from '../../constant/roles.js';
import { BASIC_ROLES } from '../../constant/roles.js';
import bcrypt from 'bcryptjs'
import { Follower } from '../followers/followerModel.js';
import { Op } from 'sequelize';
import { Profile } from '../profile/profileModel.js';
import { sequelize } from '../../config/db.js';

export const getUsers = async () => {
    const users = await User.findAll()
    return users
}

export const getRecomendedUsersSvc = async (profileId) => {
    const following = await Follower.findAll({
        where: {
            followerId: profileId
        },
        attributes: ['followingId']
    })
    const followedUserIds = following.map(follower => follower.followingId);

    const users = await User.findAll({
        where: {
            [Op.or]: [
                { roleId: BASIC_ROLES.recruiter },
                { roleId: BASIC_ROLES.student },
            ],
            id: {
                [Op.ne]: profileId,
            }
        },
        attributes: ['id'],
        limit: 5,
        include: {
            model: Profile,
            attributes: ['id', 'names', 'surnames', 'profilePic', 'title'],
            where: {
                id: {
                    [Op.notIn]: [...followedUserIds, profileId],
                }
            }
        }
    });

    return users;
}

export const getUserById = async (id) => {
    const user = await User.findByPk(id, {
        include: {
            model: Profile,
            attributes: ['id', 'names', 'surnames', 'profilePic', 'title']
        }
    })
    return user
}

export const getUserInfoSvc = async (id, followingId) => {
    try {
        const profile = await Profile.findByPk(followingId, {
            attributes: ['id', 'profilePic', 'names', 'surnames', 'title'],
            include: {
                model: User,
                attributes: ['email']
            }
        })

        const following = await Follower.findOne({
            where: {
                followingId: profile.id,
                followerId: id
            }
        })
        const cantFollowers = await Follower.count({
            where: {
                followingId: profile.id
            }
        })
        const cantFollowing = await Follower.count({
            where: {
                followerId: profile.id
            }
        })
        return { profile, following, cantFollowers, cantFollowing }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const createUser = async (user) => {
    const t = await sequelize.transaction();
    try {
        const roleId = ALL_ROLES[user.role];
        const hashpass = await bcrypt.hash(user.password, 10)

        user = {
            names: user.names,
            surnames: user.surnames,
            roleId: roleId,
            password: hashpass,
            email: user.email,
            userStateId: 1
        }

        const existingUser = await User.findOne({ where: { email: user.email } });

        if (existingUser) { throw new Error('El usuario ya existe en nuestro sistema.'); }
        const createdUser = await User.create({
            email: user.email,
            roleId: roleId,
            password: hashpass

        }, { transaction: t })
        const profile = await Profile.create({
            userId: createdUser.id,
            names: user.names,
            surnames: user.surnames,
            userStateId: 1,
            state: 1,
        }, { transaction: t });

        await t.commit();
    } catch (error) {
        console.log(error)
    }

}

