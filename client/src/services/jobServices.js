import axios from "axios";

export const getJobs = async (query = '', page) => {
    if (!page) {
        page = 1;
    }
    const res = await axios.get(`http://localhost:4000/job/search?query=${query}&page=${page}`);
    console.log(res)
    return res.data
} 