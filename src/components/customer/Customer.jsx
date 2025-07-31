import React from 'react';
import { Outlet } from 'react-router-dom';

const Customer = () => {
    return (
        <div>
            Customer Component

            <Outlet />
        </div>
    );
}

export default Customer;
