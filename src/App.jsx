import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './shared/template/Login';
import Home from './shared/template/Home';
import './app.css'
import Admin from './components/admin/Admin';
import EmployeeDashboard from './components/employee/components/EmployeeDashboard';
import ManagerDashboard from './components/manager/components/ManagerDashboard';
import AdminDashboard from './components/admin/components/AdminDashboard';
import Employee from './components/employee/Employee';
import Manager from './components/manager/Manager';
import Customer from './components/customer/Customer';
import Customerdashboard from './components/customer/components/CustomerDashboard';
import Users from './components/admin/components/users/Users';
import AdminReport from './components/admin/components/AdminReport';
import MyProfile from './shared/components/MyProfile';
import UserList from './components/admin/components/users/UserList';
import UserForm from './components/admin/components/users/UserForm';
import Category from './components/admin/components/category/Category';
import AdminAccessories from './components/admin/components/accessories/AdminAccessories';
import AdminAccessoryList from './components/admin/components/accessories/AdminAccessoryList';
import EmployeeAccessory from './components/employee/components/accessory/EmployeeAccessory';
import ManagerAccessory from './components/manager/components/accessory/ManagerAccessory';
import EmployeeAccessoryList from './components/employee/components/accessory/EmployeeAccessoryList';
import EmployeeAccessoryForm from './components/employee/components/accessory/EmployeeAccessoryForm';
import EmployeeSellingAccessory from './components/employee/components/selling-accessory/EmployeeSellingAccessory';
import ManagerAccessoryList from './components/manager/components/accessory/ManagerAccessoryList';
import EmployeeSellingAccessoryList from './components/employee/components/selling-accessory/EmployeeSellingAccessoryList';
import EmployeeSellingAccessoryForm from './components/employee/components/selling-accessory/EmployeeSellingAccessoryForm';
import Notification from './shared/components/Notification';

const App = () => {
    return (
        <>
            <Routes>
                <Route path='' element={<Navigate to='login' />} />
                <Route path='login' element={<Login />} />
                <Route path='' element={<Home />} >
                    <Route path='admin' element={<Admin />}>
                        <Route path='dashboard' element={<AdminDashboard />} />
                        <Route path='accessories' element={<AdminAccessories />} >
                            <Route path='' element={<AdminAccessoryList />} />
                        </Route>
                        <Route path='users' element={<Users />} >
                            <Route path='' element={<UserList />} />
                            <Route path='form' element={<UserForm />} />
                            <Route path=':id' element={<UserForm />} />
                        </Route>
                        <Route path='category' element={<Category />} />
                        <Route path='report' element={<AdminReport />} />
                        <Route path='my-profile' element={<MyProfile />} />
                    </Route>
                    <Route path='employee' element={<Employee />}>
                        <Route path='dashboard' element={<EmployeeDashboard />} />
                        <Route path='accessory' element={<EmployeeAccessory />} >
                            <Route path='' element={<EmployeeAccessoryList />} />
                            <Route path='form' element={<EmployeeAccessoryForm />} />
                            <Route path=':id' element={<EmployeeAccessoryForm />} />
                        </Route>
                        <Route path='selling-accessories' element={<EmployeeSellingAccessory />}>
                            <Route path='' element={<EmployeeSellingAccessoryList />} />
                            <Route path='form' element={<EmployeeSellingAccessoryForm />} />
                            <Route path=':id' element={<EmployeeSellingAccessoryForm />} />
                        </Route>
                        <Route path='my-profile' element={<MyProfile />} />
                    </Route>
                    <Route path='manager' element={<Manager />}>
                        <Route path='dashboard' element={<ManagerDashboard />} />
                        <Route path='accessory' element={<ManagerAccessory />} >
                            <Route path='' element={<ManagerAccessoryList />} />
                        </Route>
                        <Route path='my-profile' element={<MyProfile />} />
                    </Route>
                    <Route path='customer' element={<Customer />}>
                        <Route path='dashboard' element={<Customerdashboard />} />
                        <Route path='my-profile' element={<MyProfile />} />
                    </Route>
                </Route>
            </Routes>

            {/* Notification */}
            <Notification />
        </>
    );
}

export default App;
