import { combineReducers } from 'redux'
import notificationReducer from './notificationReducer'
import templateReducer from './templateReducer'

const baseReducer = combineReducers({
    notification: notificationReducer,
    template: templateReducer
})

export default baseReducer
