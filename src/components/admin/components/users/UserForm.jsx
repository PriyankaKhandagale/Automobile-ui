import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import SaveIcon from '@mui/icons-material/Save';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import { _createUser, _getCurrentUserById, _updateUser } from '../../../../services/userService';
import { useDispatch } from 'react-redux'
import { showNotificationAction } from '../../../../store/actions/notification/notificationAction';

const UserForm = () => {

    const param = useParams()
    
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [allRole] = React.useState([
        { label: 'Admin', property: 'admin' },
        { label: 'Customer', property: 'customer' },
        { label: 'Manager', property: 'manager' },
        { label: 'Employee', property: 'employee' }
    ])

    const [currentUser, setCurrentUser] = React.useState({
        firstName: '',
        lastName: '',
        emailId: '',
        password: 'Welcome@123',
        role: '',
        profilePicture: {
            name: '',
            size: null,
            type: ''
        }
    })

    const addUserStyle = {
        position: 'absolute',
        right: '30px'
    }

    const getCurrentUserById = () => {
        _getCurrentUserById(param.id).then(result => {
            console.log(result);
            setCurrentUser(result.data)
        })
    }

    React.useEffect(() => {
        console.log(param.id);
        if (param.id)
            getCurrentUserById()
    }, [])

    const handleChange = (e) => {
        console.log(e);
        const { value, name, files } = e.target

        if (files != null) {
            console.log('Have files');
            const { name: fileName, size: fileSize, type: fileType } = e.target.files[0]

            let currentProfilePicture = {
                name: fileName,
                size: fileSize,
                type: fileType
            }

            setCurrentUser({
                ...currentUser,
                profilePicture: currentProfilePicture
            })
        } else {
            setCurrentUser({
                ...currentUser,
                [name]: value
            })
        }

    }

    const navigateToUser = () => {
        navigate('/admin/users')
    }

    const createUser = () => {
        console.log(currentUser);
        _createUser(currentUser).then((result) => {
            // console.log(result);
            dispatch(showNotificationAction('User Created Successfully..!'))
            navigateToUser()
        })
    }

    const updateUser = () => {
        _updateUser(currentUser).then((result) => {
            if (result.status === 200) {
                dispatch(showNotificationAction('User Updated Successfully..!'))
                navigateToUser()
            } else {
                dispatch(showNotificationAction('Something went wrong..!'))
            }
        })
    }

    return (
        <>
            {
                param.id ? <Button onClick={() => updateUser()} variant='contained' style={addUserStyle} color='primary'>
                    <BrowserUpdatedIcon /> Update
                </Button> : <Button onClick={() => createUser()} variant='contained' style={addUserStyle} color='success'>
                    <SaveIcon /> Create
                </Button>
            }
            <hr className='auto-hr' />
            <div className='row'>
                <div className="col-md-3">
                    <TextField label="First Name" variant="standard" className='w-100'
                        value={currentUser.firstName}
                        name='firstName'
                        onChange={(e) => handleChange(e)} />
                </div>
                <div className="col-md-3">
                    <TextField label="Last Name" variant="standard" className='w-100'
                        value={currentUser.lastName}
                        name='lastName'
                        onChange={(e) => handleChange(e)} />
                </div>
                <div className="col-md-3">
                    <TextField label="Email Id" variant="standard" className='w-100'
                        value={currentUser.emailId}
                        name='emailId'
                        onChange={(e) => handleChange(e)} />
                </div>

                <div className="col-md-3">
                    <FormControl className='w-100' variant="standard">
                        <InputLabel>Role</InputLabel>
                        <Select value={currentUser.role}
                            name='role'
                            onChange={(e) => handleChange(e)}>
                            {
                                allRole.map((role, index) => (
                                    <MenuItem key={index} value={role.property}>
                                        {role.label}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
            </div>
            {/* <div className="row">
                <div className="col-md-6">
                    <TextField label="Profile Picture" type={'file'} variant="standard" className='w-100'
                        value={currentUser.profilePicture}
                        name='profilePicture'
                        onChange={(e) => handleChange(e)} />
                </div>
            </div> */}
        </>
    );
}

export default UserForm;
