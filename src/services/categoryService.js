import axios from 'axios'

const devUrl = 'http://localhost:7070/category'

export const _getAllCategory = () => {
    return axios.get(devUrl + '/' + 'all')
}

export const _createCategory = (category) => {
    return axios.post(devUrl + '/' + 'create', category)
}

export const _getCurrentCategoryById = (id) => {
    return axios.get(devUrl + '/' + 'current' + '/' + id)
}

export const _updateCategory = (category) => {
    return axios.put(devUrl + '/' + 'update', category)
}

export const _deleteCategory = (id) => {
    return axios.delete(devUrl + '/' + 'delete' + '/' + id)
}
