export const showNotificationAction = (message) => {
    return {
        message: message,
        type: 'Show-Notification'
    }
}

export const hideNotificationAction = () => {
    return {
        message: '',
        type: 'Hide-Notification'
    }
}
