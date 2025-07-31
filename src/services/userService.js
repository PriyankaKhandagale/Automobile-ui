import axios from 'axios'

const devUrl = 'http://localhost:7070/user'

export const _getAllUser = () => {
    return axios.get(devUrl + '/' + 'all')
}

export const _getCurrentUserById = (id) => {
    return axios.get(devUrl + '/' + 'current' + '/' + id)
}

export const _createUser = (currentUser) => {
    return axios.post(devUrl + '/' + 'create', currentUser)
}

export const _getDeleteUserById = (id) => {
    return axios.delete(devUrl + '/' + 'delete' + '/' + id)
}

export const _getEmployeeEmailIdById = (id) => {
    return axios.get(devUrl + '/' + id).then(result => {
        return result.data.emailId
    })
}

export const _checkCurrentLoginUser = (loginUser) => {
    return axios.post(devUrl + '/' + 'checkLogin', loginUser)
}

export const _updateUser = (user) => {
    return axios.put(devUrl + '/' + 'update', user)
}