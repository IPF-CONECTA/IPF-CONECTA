export const report = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/report`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error reporting:", error);
        return error;
    }
}