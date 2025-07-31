
const defaultTemplate = {
    type: 'Zoom-Out',
    displayLabel: true
}

const templateReducer = (state = defaultTemplate, action) => {
    switch (action.type) {
        case 'Zoom-In':
            return state = action
        case 'Zoom-Out':
            return state = action
        default:
            return state
    }
}

export default templateReducer


// It is a function
// It accepts action & state
// It will return new/next state
