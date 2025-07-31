import { Button, Snackbar } from "@mui/material"
import { useSelector, useDispatch } from 'react-redux'
import { hideNotificationAction } from "../../store/actions/notification/notificationAction"

const Notification = () => {

    const dispatch = useDispatch()
    const notification = useSelector((state) => state.BASE.notification)

    const handleClose = () => {
        dispatch(hideNotificationAction())
    }

    return (
        <>
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={notification.message}
                action={
                    <Button color="secondary" onClick={handleClose}>
                        Close
                    </Button>
                }
            />
        </>
    )
}

export default Notification