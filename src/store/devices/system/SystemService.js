import axios from "axios";

const url = "http://localhost:8000/api/routers/";


// Get user goals

const system = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/system`, config)
    if (response.data) {
        localStorage.setItem("system", JSON.stringify(response.data));
    }
    return response.data
}
const resources = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/resources`, config)
    if (response.data) {
        localStorage.setItem("resources", JSON.stringify(response.data));
    }
    return response.data
}



const SystemService = {
    system, resources,
}

export default SystemService