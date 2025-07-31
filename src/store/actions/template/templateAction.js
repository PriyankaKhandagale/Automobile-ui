export const zoomInTemplateAction = () => {
    return {
        type: 'Zoom-In',
        displayLabel: false
    }
}

export const zoomOutTemplateAction = () => {
    return {
        type: 'Zoom-Out',                          /// Default
        displayLabel: true
    }
}
