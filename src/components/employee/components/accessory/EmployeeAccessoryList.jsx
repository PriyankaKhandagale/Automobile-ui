import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { _deleteAccessory, _getAllAccessory } from '../../../../services/accessoryService';
import Grid from '../../../../shared/components/Grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { _getEmployeeEmailIdById } from '../../../../services/userService';
import AutomobilesDialog from '../../../../shared/components/AutomobilesDialog';

const EmployeeAccessoryList = () => {

    const navigate = useNavigate()

    const [allProduct, setAllProduct] = React.useState([])
    const [showDialog, setShowDialog] = React.useState(false)
    const [allColumn] = React.useState([
        { lable: 'Name', property: 'name' },
        { lable: 'Company Name', property: 'companyName' },
        { lable: 'Description', property: 'description' },
        { lable: 'Price', property: 'price' },
        { lable: 'Category', property: 'category' },
        { lable: 'Quantity', property: 'quantity' },
        { lable: 'Employee Email Id', property: 'emailId' },
        { lable: 'Active', property: 'status' },
        { lable: 'Action', property: 'action' }
    ])

    const [currentProduct, setCurrentProduct] = React.useState({
        name: '',
        category: '',
        id: null,
        companyName: '',
        quantity: '',
        description: '',
        price: '',
        status: '',
        employeeId: JSON.parse(localStorage.getItem('user')).id
    })

    const [dialogColumns] = React.useState([
        { lable: 'Name', property: 'name' },
        { lable: 'Category', property: 'category' },
        { lable: 'Company Name', property: 'companyName' },
        { lable: 'Quantity', property: 'quantity' },
        { lable: 'Description', property: 'description' },
        { lable: 'Price', property: 'price' },
        { lable: 'Status', property: 'status' }
    ])

    React.useEffect(() => {
        getAllAccessory()
    }, [])

    const getAllAccessory = () => {
        _getAllAccessory().then(result => {
            console.log(result.data)
            let products = result.data
            setAllProduct(result.data)
            // products.forEach(async (product) => {
            //     let employeeEmailId = await getEmployeeEmailIdById(product.employeeId)
            //     console.log(employeeEmailId);
            //     product.emailId = employeeEmailId
            //     // setAllProduct(...allProduct, [product])
            // })
        })
    }

    const getEmployeeEmailIdById = (employeeId) => {
        return new Promise((reslove) => {
            _getEmployeeEmailIdById(employeeId).then(emailId => {
                reslove(emailId)
            })
        })
    }

    const addUserStyle = {
        position: 'absolute',
        right: '30px'
    }

    const navigateToForm = () => {
        navigate('form')
    }

    const deleteProduct = (id) => {
        _deleteAccessory(id).then(result => {
            alert('Accessory Deleted Successfully !');
            getAllAccessory()
        })
    }

    const viewProduct = (product) => {
        console.log(product);
        setCurrentProduct(product)
        setShowDialog(true)
    }

    const editAccessory = (id) => {
        navigate(`${id}`)
    }

    return (
        <>
            <Button variant='contained' onClick={() => navigateToForm()}
                style={addUserStyle}>
                <AddCircleIcon /> Add
            </Button>
            <hr className='auto-hr' />
            <Grid records={allProduct}
                columns={allColumn}
                deleteRecord={(id) => deleteProduct(id)}
                viewRecord={(product) => viewProduct(product)}
                editRecord={(id) => editAccessory(id)}
                type="employee-accessory" />

            <AutomobilesDialog columns={dialogColumns} record={currentProduct}
                showDialog={showDialog}
                title={currentProduct.name}
                setShowDialog={() => setShowDialog(false)} />
        </>
    );
}

export default EmployeeAccessoryList;
