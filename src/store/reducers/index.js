import { combineReducers } from 'redux'
import baseReducer from './base';

const myCartReducer = combineReducers({
    BASE: baseReducer,   // index.js (BASE)
    // ADMIN: adminReducer,
    // EMPLOYEE: employeeReducer,
    // CUSTOMER: customerReducer
})

export default myCartReducer;
