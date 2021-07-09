import axios from 'axios'
const baseUrl = 'http://localhost:3002/api/users'

const getUserById = async id => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const exports = {
    getUserById
};

export default exports;