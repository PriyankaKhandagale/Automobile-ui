const notificationReducer = (state = { message: '', open: false }, action) => {
    switch (action.type) {
        case 'Show-Notification':
            return state = { message: action.message, open: true }
        case 'Hide-Notification':
            return state = { message: action.message, open: false }
        default:
            return state
    }
}

export default notificationReducer
