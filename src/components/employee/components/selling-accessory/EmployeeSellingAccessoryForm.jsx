import { Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import React from 'react';
import { _getAllCategory } from '../../../../services/categoryService';
import SellIcon from '@mui/icons-material/Sell';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';
import { _createAccessory, _getAllAccessory, _getCurrentAccessoryById, _updateAccessory } from '../../../../services/accessoryService';
import { _createCustomer, _getAllCustomer } from '../../../../services/customerService';
import { useDispatch } from 'react-redux';
import { showNotificationAction } from '../../../../store/actions/notification/notificationAction';

const EmployeeSellingAccessoryForm = () => {

    const param = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const [currentCustomer, setCurrentCustomer] = React.useState({
        id: null,
        name: '',
        role: 'customer',
        emailId: '',
        contactNumber: '',
        address: '',
        accessoryName: '',
        accessoryId: null,
        availableQuantity: null,
        reqQuantity: null,
        amount: null
    })

    const [allAccessory, setAllAccessory] = React.useState([{
        id: null,
        name: '',
        companyName: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        emailId: ''
    }])

    React.useEffect(() => {
        _getAllAccessory().then((result) => {
            console.log(result.data);
            setAllAccessory(result.data)
        })
    }, [])

    const getCurrentAccessoryById = () => {
        _getCurrentAccessoryById(param.id).then(
            (result) => {
                setCurrentProduct(result.data);
            })
    }

    const addUserStyle = {
        position: 'absolute',
        right: '30px'
    }

    const handleChange = (e) => {
        console.log(e);
        const { value, name } = e.target

        setCurrentCustomer({
            ...currentCustomer,
            [name]: value
        })
        console.log(currentCustomer);
    }

    const createCustomer = () => {
        console.log(currentCustomer);
        _createCustomer(currentCustomer).then((result) => {
            console.log(result)
            dispatch(showNotificationAction('Customer Created Successfully..!'))
        })
    }

    const updateAccessory = () => {
        _updateAccessory(currentProduct).then(
            (result) => {
                if (result.status === 200) {
                    alert('Accessory Udpated Successfully')
                    navigate('/employee/accessory')
                }
            })
    }

    return (
        <>
            <hr className='auto-hr' />

            <div className="row">
                <div className="col-md-3 border border-info" style={{ padding: '15px' }}>
                    <h6 className='selling-accessory-title'>Customer Details</h6>
                    <TextField label="Name" variant="standard" className='w-100' name='name'
                        value={currentCustomer.name} onChange={(e) => handleChange(e)} />
                    <TextField label="Email Id" variant="standard" className='w-100' name='emailId'
                        value={currentCustomer.emailId} onChange={(e) => handleChange(e)} />
                    <TextField label="Contact Number" variant="standard" className='w-100' name='contactNumber'
                        value={currentCustomer.contactNumber} onChange={(e) => handleChange(e)} />
                    <TextField label="Address" variant="standard" className='w-100' name='address'
                        value={currentCustomer.address} onChange={(e) => handleChange(e)} />
                </div>
                <div className="col-md-9">
                    <div className="row selling-accessory-form">
                        <div className='col-md-4'>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel >Accessory</InputLabel>
                                <Select
                                    value={currentCustomer.accessoryName}
                                    onChange={(e) => handleChange(e)}
                                    name="accessoryName">
                                    {
                                        allAccessory.map((accessory, index) => (

                                            <MenuItem key={index} value={accessory.name}>
                                                {accessory.name}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <div className='col-md-4'>
                            <TextField label="Quantity" variant="standard" className='w-100'
                                name='reqQuantity'
                                value={currentCustomer.reqQuantity} onChange={(e) => handleChange(e)} />
                        </div>
                        <div className='col-md-4'>
                            <Button variant='contained' color='info'
                                onClick={() => createCustomer()}>Add To Details</Button>
                        </div>
                    </div>
                    <h6 className='mt-4 selling-accessory-title'>Accessory Details</h6>
                    <table className='table table-border'>
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{currentCustomer.id}</td>
                                <td>{currentCustomer.name}</td>
                                <td>{currentCustomer.reqQuantity}</td>
                                <td>{currentCustomer.price}</td>
                                <td>{currentCustomer.amount}</td>
                                <td>
                                    <CloseIcon />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default EmployeeSellingAccessoryForm;

