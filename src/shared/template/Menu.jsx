import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import allMenu from '../../model/menuModel';
import MotionPhotosAutoIcon from '@mui/icons-material/MotionPhotosAuto';
import { Tooltip } from '@mui/material'

const Menu = ({ currentLoginUser }) => {

    const template = useSelector(store => store.BASE.template)

    return (
        <>
            <div className='menu-title'>
                {
                    template.displayLabel ?
                        <span>
                            <span>
                                AUTOMOBILES
                            </span>
                        </span>
                        : <MotionPhotosAutoIcon />
                }
            </div>

            <hr className='auto-hr' />
            {
                allMenu[0][currentLoginUser.role] &&
                allMenu[0][currentLoginUser.role].map((menu, index) => (
                    <NavLink key={index} to={currentLoginUser.role + '/' + menu.property}

                        className={(menuLink) => (
                            menuLink.isActive ? 'active-menu' : 'inactive-menu'
                        )}>
                        <div className='menu-label'>
                            <span className='menu-icon-label'>
                                {
                                    template.displayLabel ? menu.icon :
                                        <Tooltip title={menu.label} placement='right'>
                                            {menu.icon}
                                        </Tooltip>
                                }
                                <span style={{ 'marginRight': '10px' }} ></span>
                                {
                                    template.displayLabel ? menu.label : ''
                                }
                            </span>
                        </div>
                    </NavLink>
                ))
            }
        </ >
    );
}

export default Menu;
