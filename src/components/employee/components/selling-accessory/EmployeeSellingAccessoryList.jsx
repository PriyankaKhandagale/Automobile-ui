import React from 'react';
import { useNavigate } from 'react-router-dom';
import { _getAllActiveAccessory,} from '../../../../services/accessoryService';
import AutomobilesDialog from '../../../../shared/components/AutomobilesDialog';
import Grid from '../../../../shared/components/Grid';
import SellIcon from '@mui/icons-material/Sell';
import { Button } from '@mui/material';

const EmployeeSellingAccessoryList = () => {
    const navigate = useNavigate()
    const [showDialog, setShowDialog] = React.useState(false)
    const [currentAccessory, setCurrentAccessory] = React.useState({
        id: null,
        name: '',
        companyName: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        emailId: '',
        status: 'active'
    })

    const [allActiveAccessory, setAllActiveAccessory] = React.useState([])
    const [allColumn] = React.useState([
        { lable: 'Name', property: 'name' },
        { lable: 'Company Name', property: 'companyName' },
        { lable: 'Description', property: 'description' },
        { lable: 'Price', property: 'price' },
        { lable: 'Quantity', property: 'quantity' },
        { lable: 'Category', property: 'category' },
        { lable: 'Status', property: 'status' },
        { lable: 'Action', property: 'action' }
    ])

    const [dialogColumns] = React.useState([
        { lable: 'Name', property: 'name' },
        { lable: 'Company Name', property: 'companyName' },
        { lable: 'Description', property: 'description' },
        { lable: 'Price', property: 'price' },
        { lable: 'Quantity', property: 'quantity' },
        { lable: 'Category', property: 'category' },
        { lable: 'Status', property: 'status' }
    ])

    React.useEffect(() => {
        getAllActiveAccessory()
    }, [])

    const getAllActiveAccessory = () => {
        _getAllActiveAccessory().then(result => {
            setAllActiveAccessory(result.data)
        })
    }

    const viewRecord = (accessory) => {
        setCurrentAccessory(accessory)
        setShowDialog(true)
    }

    const addUserStyle = {
        position: 'absolute',
        right: '30px'
    }

    const navigateToForm = () => {
        navigate('form')
    }
    
    const sellAccessory = (id) => {
        navigate(`${id}`)
    }

    return (
        <>
            <Button variant='contained' onClick={() => navigateToForm()}
                style={addUserStyle}>
                <SellIcon /> Selling an Accessory
            </Button>
            <hr className='auto-hr' />

            <Grid records={allActiveAccessory}
                columns={allColumn}
                type="employee-selling-accessory"
                viewRecord={(record) => viewRecord(record)}
                sellRecord={(id) => sellAccessory(id)}
            />

            <AutomobilesDialog columns={dialogColumns} record={currentAccessory}
                showDialog={showDialog}
                title={currentAccessory.name}
                setShowDialog={() => setShowDialog(false)} />
        </>
    );
}

export default EmployeeSellingAccessoryList;
