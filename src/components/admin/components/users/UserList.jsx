import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom'
import { _getAllUser, _getCurrentUserById, _getDeleteUserById } from '../../../../services/userService';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Grid from '../../../../shared/components/Grid';
import AutomobilesDialog from '../../../../shared/components/AutomobilesDialog';
import { useDispatch } from 'react-redux'
import { showNotificationAction } from '../../../../store/actions/notification/notificationAction';

const UserList = () => {

    const dispatch = useDispatch()
    const [showDialog, setShowDialog] = React.useState(false)
    const [allUser, setAllUser] = React.useState([])
    const [currentUser, setCurrentUser] = React.useState({
        firstName: '',
        lastName: '',
        emailId: '',
        role: '',
        id: null
    })
    const [allColumn] = React.useState([
        { lable: 'First Name', property: 'firstName' },
        { lable: 'Last Name', property: 'lastName' },
        { lable: 'Email Id', property: 'emailId' },
        { lable: 'Role', property: 'role' },
        { lable: 'Action', property: 'action' }
    ])

    const [dialogColumns] = React.useState([
        { lable: 'First Name', property: 'firstName' },
        { lable: 'Last Name', property: 'lastName' },
        { lable: 'Email Id', property: 'emailId' },
        { lable: 'Role', property: 'role' }
    ])

    const navigate = useNavigate()

    const navigateToForm = () => {
        navigate('form')
    }

    React.useEffect(() => {
        getAllUser()
    }, [])

    const getAllUser = () => {
        _getAllUser().then(result => setAllUser(result.data))
    }

    const addUserStyle = {
        position: 'absolute',
        right: '30px'
    }

    const deleteUser = (id) => {
        // console.log(id);
        _getDeleteUserById(id).then(result => {
            // console.log(result);
            if (result.status === 200) {
                getAllUser()
                dispatch(showNotificationAction('User Deleted Successfully'))
            }
        })
    }

    const viewUser = (user) => {
        console.log(user);
        setCurrentUser(user)
        setShowDialog(true)
    }

    const editUser = (id) => {
        console.log(id);
        // navigate('/admin/user/' + id);
        navigate(`${id}`)
    }

    return (
        <>
            <Button variant='contained' onClick={() => navigateToForm()}
                style={addUserStyle}>
                <AddCircleIcon /> Add
            </Button>
            <hr className='auto-hr' />
            <Grid records={allUser}
                columns={allColumn}
                deleteRecord={(id) => deleteUser(id)}
                viewRecord={(user) => viewUser(user)}
                editRecord={(id) => editUser(id)}
                type="admin-user" />

            <AutomobilesDialog columns={dialogColumns} record={currentUser}
                showDialog={showDialog}
                title={`${currentUser.firstName}.${currentUser.lastName}`}
                setShowDialog={() => setShowDialog(false)} />
        </>
    );
}

export default UserList;
