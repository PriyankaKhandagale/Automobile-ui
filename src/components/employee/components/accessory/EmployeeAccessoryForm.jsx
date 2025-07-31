import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { _getAllCategory } from '../../../../services/categoryService';
import SaveIcon from '@mui/icons-material/Save';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import { useNavigate, useParams } from 'react-router-dom';
import { _createAccessory, _getCurrentAccessoryById, _updateAccessoryByEmployee } from '../../../../services/accessoryService';

const EmployeeAccessoryForm = () => {

    const param = useParams()
    const navigate = useNavigate()

    const [allCategory, setAllCategory] = React.useState([])
    const [currentProduct, setCurrentProduct] = React.useState({
        name: '',
        category: '',
        id: null,
        companyName: '',
        quantity: '',
        description: '',
        price: '',
        status: 'Inactive',
        employeeId: JSON.parse(localStorage.getItem('user')).id
    })

    React.useEffect(() => {
        if (param.id) getCurrentAccessoryById()
        _getAllCategory().then(result => setAllCategory(result.data))
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

    const createProduct = () => {
        _createAccessory(currentProduct).then(
            (result) => {
                if (result.status === 201) {
                    alert('Accessory Created Successfully')
                    navigate('/employee/accessory')
                }
            })
    }

    const handleChange = (e) => {
        const { value, name } = e.target
        setCurrentProduct({
            ...currentProduct,
            [name]: value
        })
    }

    const updateAccessory = () => {
        _updateAccessoryByEmployee(currentProduct).then(
            (result) => {
                if (result.status === 200) {
                    alert('Accessory Udpated Successfully')
                    navigate('/employee/accessory')
                }
            })
    }

    return (
        <>
            {
                param.id ? <Button onClick={() => updateAccessory()}
                    variant='contained' style={addUserStyle} color='primary'>
                    <BrowserUpdatedIcon />
                    Update
                </Button> :
                    <Button onClick={() => createProduct()}
                        variant='contained' style={addUserStyle} color='success'>
                        <SaveIcon />
                        Create
                    </Button>
            }
            <hr className='auto-hr' />
            <div className='row'>
                <div className="col-md-3">
                    <TextField label="Name" variant="standard" className='w-100'
                        value={currentProduct.name}
                        name='name'
                        onChange={(e) => handleChange(e)} />
                </div>
                <div className="col-md-3">
                    <TextField label="Company Name" variant="standard" className='w-100'
                        value={currentProduct.companyName}
                        name='companyName'
                        onChange={(e) => handleChange(e)} />
                </div>
                <div className="col-md-3">
                    <TextField label="Price" variant="standard" className='w-100'
                        value={currentProduct.price}
                        name='price'
                        onChange={(e) => handleChange(e)} />
                </div>

                <div className="col-md-3">
                    <FormControl className='w-100' variant="standard">
                        <InputLabel>Category</InputLabel>
                        <Select value={currentProduct.category}
                            name='category'
                            onChange={(e) => handleChange(e)}>
                            {
                                allCategory.map((category, index) => (
                                    <MenuItem key={index} value={category.name}>
                                        {category.name}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <TextField label="Quantity" variant="standard" className='w-100'
                        value={currentProduct.quantity}
                        name='quantity'
                        onChange={(e) => handleChange(e)} />
                </div>
                <div className="col-md-9">
                    <TextField label="Description" variant="standard" className='w-100'
                        value={currentProduct.description}
                        name='description'
                        onChange={(e) => handleChange(e)} />
                </div>
                {/* <div className="col-md-6">
                    <TextField label="Profile Picture" type={'file'} variant="standard" className='w-100'
                        value={currentProduct.profilePicture.name}
                        name='profilePicture'
                        onChange={(e) => handleChange(e)} />
                </div> */}
            </div>
        </>
    );
}

export default EmployeeAccessoryForm;
