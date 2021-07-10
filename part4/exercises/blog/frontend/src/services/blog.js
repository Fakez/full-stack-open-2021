import axios from 'axios'
const baseUrl = 'http://localhost:3002/api/blogs'

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
}

const getBlog = async id => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
}

const createBlog = async newBlog => {
    const config = {
        headers: {Authorization: token},
    }
    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
}

const updateBlog = async (id, updatedBlog) => {
    
    const response = await axios.put(`${baseUrl}/${id}`, updatedBlog);
    return response.data;

}

const exports = {
    setToken,
    getBlog,
    createBlog,
    updateBlog,
};

export default exports;