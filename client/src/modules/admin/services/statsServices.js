import axios from "axios"
import { BASE_URL } from "../../../constants/BASE_URL"

export const getActiveJobs = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/stats/active-jobs`)
        return { data: res.data, status: res.status }
    } catch (error) {
        return { status: error.status }
    }
}

export const getRecruitedUsers = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/stats/recruited-users`)
        return { data: res.data, status: res.status }

    } catch (error) {
        return { status: error.status }

    }
}

export const getPostsQ = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/stats/posts`)
        return { data: res.data, status: res.status }

    } catch (error) {
        return { status: error.status }

    }
}
export const getPostsByMonth = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/stats/posts-by-month`)
        return { data: res.data, status: res.status }

    } catch (error) {
        return { status: error.status }

    }
}
export const getUsersByMonth = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/stats/users-by-month`)
        return { data: res.data, status: res.status }

    } catch (error) {
        return { status: error.status }

    }
}
export const getSkillsTrend = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/stats/skills-trend`)
        return { data: res.data, status: res.status }

    } catch (error) {
        return { status: error.status }

    }
}