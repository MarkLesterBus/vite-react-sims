import axios from "axios";

const url = "http://localhost:8000/api/devices/";


// Get user goals

const resource = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/system/resource`, config)
    return response.data
}

const clock = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/system/clock`, config)
    return response.data
}


const ResourceService = {
    create, get_all, get_one, update, remove
}

export default ResourceService