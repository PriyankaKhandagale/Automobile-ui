import axios from 'axios'

const devUrl = "http://localhost:7070/customer"

export const _getAllCustomer = () => {
    return axios.get(devUrl + '/' + 'all')
}

export const _createCustomer = (customer) => {
    return axios.post(devUrl + '/' + 'create', customer)
}


 