import axios from 'axios'
const baseUrl = 'http://localhost:3002/api/blogs'

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
}

const createBlog = async newBlog => {
    const config = {
        headers: {Authorization: token},
    }
    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
}

const exports = {
    setToken,
    createBlog,
};

export default exports;