import axios from "axios";

const url = "http://localhost:8000/api/devices";


// Create new goal
const create = async (device, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url, device, config)
    return response.data
}

// Get user goals

const get_all = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url, config)
    return response.data
}

const get_one = async (token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `/${id}`, config)
    return response.data
}

const update = async (device, id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(url + `/${id}`, device, config)
    return response.data
}

// Delete user goal
const remove = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `/${id}`, config)
    return response.data
}

const DeviceServive = {
    create, get_all, get_one, update, remove
}

export default DeviceServive