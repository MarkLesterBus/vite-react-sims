import axios from "axios";

const url = "http://localhost:8000/api/system/";


// Get user goals

const system = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}`, config)
    if (response.data) {
        localStorage.setItem("system", JSON.stringify(response.data));
    }else{
        localStorage.setItem("system", {});

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
    }else{
        localStorage.setItem("resources", []);
    }
    return response.data
}
const traffic = async (token, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${data['uuid']}/traffic/${data['intface']}`, config)
    if (response.data) {
        localStorage.setItem("traffic", JSON.stringify(response.data));
    }else{
        localStorage.setItem("resources", {});
    }
    return response.data
}

const logs = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/logs`, config)
    if (response.data) {
        localStorage.setItem("logs", JSON.stringify(response.data));
    }
    else{
        localStorage.setItem("resources", []);
    }
    return response.data
}


const interfaces = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/interfaces`, config)
    if (response.data) {
        localStorage.setItem("interfaces", JSON.stringify(response.data));
    }
    return response.data
}




const vlans = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/vlans`, config)
    if (response.data) {
        localStorage.setItem("vlans", JSON.stringify(response.data));
    }
    return response.data
}
const create_vlans = async (token, uuid, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/vlans`, data, config)
    return response.data
}
const remove_vlans = async (token, uuid, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `${uuid}/vlans/${id}`, config)
    return response.data
}







const bridges = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/bridges`, config)
    if (response.data) {
        localStorage.setItem("bridges", JSON.stringify(response.data));
    }
    return response.data
}
const create_bridges = async (uuid, bridge, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/bridges`, bridge, config)
    if (response.data) {
        console.log(response.data)
    } else {
        console.log("Error")
    }
    return response.data
}
const remove_bridges = async (token, uuid, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `${uuid}/bridges/${id}`, config)
    return response.data
}





const ports = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/ports`, config)
    if (response.data) {
        localStorage.setItem("ports", JSON.stringify(response.data));
    }
    return response.data
}
const create_ports = async (token, uuid, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/ports`, data, config)

    return response.data
}
const remove_ports = async (token, uuid, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `${uuid}/ports/${id}`, config)
    return response.data
}




const addresses = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/ip/addresses`, config)
    if (response.data) {
        localStorage.setItem("addresses", JSON.stringify(response.data));
    }
    return response.data
}
const create_addresses = async (token, uuid, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/ip/addresses`, data, config)

    return response.data
}
const remove_address = async (token, uuid, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `${uuid}/ip/addresses/${id}`, config)
    return response.data
}



const pool = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/ip/pool`, config)
    if (response.data) {
        localStorage.setItem("pools", JSON.stringify(response.data));
    }
    return response.data
}
const create_pools = async (token, uuid, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/ip/pool`, data, config)

    return response.data
}
const remove_pools = async (token, uuid, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `${uuid}/ip/pool/${id}`, config)
    return response.data
}



const dns = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/ip/dns`, config)
    if (response.data) {
        localStorage.setItem("dns", JSON.stringify(response.data));
    }
    return response.data
}
const update_dns = async (token, uuid, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/ip/dns`, data, config)

    return response.data
}


const hotspots = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/hotspot`, config)
    if (response.data) {
        localStorage.setItem("hotspots", JSON.stringify(response.data));
    }
    return response.data
}

const create_hotspot = async (token, uuid, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/hotspot`, data, config)

    return response.data
}
const remove_hotspot = async (token, uuid, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `${uuid}/hotspot/${id}`, config)

    return response.data
}



const hotspot_profiles = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/hotspot/profiles`, config)
    if (response.data) {
        localStorage.setItem("hotspot_profiles", JSON.stringify(response.data));
    }
    return response.data
}
const create_profile = async (token, uuid, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/hotspot/profiles`, data, config)

    return response.data
}
const remove_profile = async (token, uuid, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `${uuid}/hotspot/profiles/${id}`, config)

    return response.data
}

const users = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/hotspot/users`, config)
    if (response.data) {
        localStorage.setItem("users", JSON.stringify(response.data));
    }
    return response.data
}
const add_user = async (token, uuid, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/hotspot/users`, data, config)

    return response.data
}
const remove_user = async (token, uuid, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `${uuid}/hotspot/users/${id}`, config)

    return response.data
}
const user_profile = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/hotspot/users/profile`, config)
    if (response.data) {
        localStorage.setItem("user_profile", JSON.stringify(response.data));
    }
    return response.data
}
const add_user_profile = async (token, uuid, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/hotspot/users/profile`, data, config)

    return response.data
}
const remove_user_profile = async (token, uuid, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `${uuid}/hotspot/users/profile/${id}`, config)

    return response.data
}



const SystemService = {
    system, resources, traffic, logs, interfaces,
    bridges, ports, vlans, create_vlans, create_bridges, create_ports, remove_bridges,

    addresses, pool, dns, create_addresses, create_pools, update_dns,
    create_hotspot, create_profile, remove_profile, remove_hotspot,

    remove_address, remove_bridges, remove_ports, remove_vlans, remove_pools, hotspots, hotspot_profiles,
    users, add_user, remove_user, user_profile, add_user_profile, remove_user_profile
}

export default SystemService