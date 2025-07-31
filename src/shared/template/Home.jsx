import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Menu from './Menu';
import { Outlet } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import { useSelector } from 'react-redux'

const Home = () => {

    const [currentLoginUser, setCurrentLoginUser] = React.useState({
        emailId: '',
        firstName: '',
        lastName: '',
        password: '',
        role: '',
        id: ''
    })

    const template = useSelector(store => store.BASE.template)

    React.useEffect(() => {
        setCurrentLoginUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    return (
        <>
            <div className='automobiles-container'>
                <div
                    //   className="menu-container-zoom-out base-color"
                    className={
                        template.type === 'Zoom-Out' ? 'menu-container-zoom-out base-color' :
                            template.type === 'Zoom-In' ? 'menu-container-zoom-in base-color'
                                : 'menu-container-zoom-out base-color'}>


                    <Menu currentLoginUser={currentLoginUser} />
                </div>
                <div
                    // className="main-container"
                    className={
                        template.type === 'Zoom-Out' ? 'main-container-zoom-out' :
                            template.type === 'Zoom-In' ? 'main-container-zoom-in'
                                : 'main-container-zoom-out'}>
                    <div className="dynamic-container">
                        <div className="header">
                            <Header currentLoginUser={currentLoginUser} />
                        </div>
                        <Paper elevation={3} style={{ padding: '20px' }}>
                            <Outlet />
                        </Paper>
                    </div>
                    <div className="footer base-color">
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
