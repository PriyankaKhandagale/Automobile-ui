import axios from 'axios'

const devUrl = 'http://localhost:7070/accessory'

export const _getAllAccessory = () => {
    return axios.get(devUrl + '/' + 'all')
}

export const _getAllActiveAccessory = () => {
    return axios.get(devUrl + '/' + 'active' + '/' + 'all')
}

export const _createAccessory = (accessory) => {
    return axios.post(devUrl + '/' + 'create', accessory)
}

export const _getCurrentAccessoryById = (id) => {
    return axios.get(devUrl + '/' + 'current' + '/' + id)
}

export const _updateAccessoryByEmployee = (accessory) => {
    return axios.put(devUrl + '/' + 'updateByEmployee', accessory)
}

export const _updateAccessory = (accessory) => {
    return axios.put(devUrl + '/' + 'update', accessory)
}

export const _deleteAccessory = (id) => {
    return axios.delete(devUrl + '/' + 'delete' + '/' + id)
}