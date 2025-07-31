import { TextField, Button } from '@mui/material';
import React from 'react';
import { _checkCurrentLoginUser, _getAllUser } from '../../services/userService';
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()

    const [loginUser, setLoginUser] = React.useState({
        emailId: '',
        password: ''
    })

    const handelChange = (event) => {
        const { value, name } = event.target
        setLoginUser({
            ...loginUser,
            [name]: value
        })
    }

    const checkLoginUser = () => {
        _checkCurrentLoginUser(loginUser).then(result => {
            if (result.status === 200) {
                localStorage.setItem('user', JSON.stringify(result.data))
                navigate('/' + result.data.role + '/dashboard')
                alert('Login Successfully')
            }
        }).catch((error) => {
            if (error.response.status === 404) {
                alert(error.response.data)
            }
        })
    }

    return (
        <div className='login'>
            <div>
                <TextField label="Email Id" variant="standard"
                    value={loginUser.emailId}
                    name='emailId'
                    onChange={(e) => handelChange(e)} />
            </div>
            <div>
                <TextField label="Password" variant="standard"
                    type='password'
                    value={loginUser.password}
                    name='password'
                    onChange={(e) => handelChange(e)} />
            </div>
            <div className='mt-3'>
                <Button variant="contained" onClick={() => checkLoginUser()}>Login</Button>
            </div>
        </div>
    );
}

export default Login;
