import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { Button, TextField } from '@mui/material';
import { _getCurrentUserById, _updateUser } from '../../services/userService';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';

const MyProfile = () => {
    const [currentLoginUser, setCurrentLoginUser] = React.useState({
        emailId: '',
        firstName: '',
        lastname: '',
        password: '',
        role: '',
        id: ''
    })

    const [isTextboxDisabled, setTextboxDisabled] = React.useState(true)
    React.useEffect(() => {
        getCurrentUserById()
    }, [])

    const getCurrentUserById = () => {
        let id = JSON.parse(localStorage.getItem('user')).id
        _getCurrentUserById(id).then((result) => {
            setCurrentLoginUser(result.data)
        })
    }
    const updateMyProfile = () => {
        _updateUser(currentLoginUser).then((result) => {
            localStorage.setItem('user', JSON.stringify(currentLoginUser))
            getCurrentUserById()
            setTextboxDisabled(true)
            alert('Profile updated successfully...!')
        })
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setCurrentLoginUser({
            ...currentLoginUser,
            [name]: value
        })
    }
    const editButtonStyle = {
        position: 'absolute',
        right: '35px',
        top: '70px'
    }

    return (
        <>
            {
                isTextboxDisabled ?
                    <EditIcon color='primary' className='pointer' style={editButtonStyle}
                        onClick={() => setTextboxDisabled(false)} /> :
                    <Button variant='contained' style={editButtonStyle} color='primary'
                        onClick={() => updateMyProfile()}>
                        <BrowserUpdatedIcon /> Update
                    </Button>
            }
            <hr className='auto-hr' />
            <div className='row'>
                <div className="col-md-3">
                    <TextField label="First Name" variant="standard" className='w-100'
                        value={currentLoginUser.firstName}
                        name='firstName'
                        onChange={(e) => handleChange(e)}
                        disabled={isTextboxDisabled} />
                </div>
                <div className="col-md-3">
                    <TextField label="Last Name" variant="standard" className='w-100'
                        value={currentLoginUser.lastName}
                        name='lastName'
                        onChange={(e) => handleChange(e)}
                        disabled={isTextboxDisabled} />
                </div>
                <div className="col-md-3">
                    <TextField label="Email Id" variant="standard" className='w-100'
                        value={currentLoginUser.emailId}
                        name='emailId'
                        disabled={true} />
                </div>
                <div className="col-md-3">
                    <TextField label="Role" variant="standard" className='w-100'
                        value={currentLoginUser.role}
                        name='role'
                        disabled={true} />
                </div>
            </div>
        </>
    );
}

export default MyProfile;
