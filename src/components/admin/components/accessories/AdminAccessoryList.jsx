import React from 'react';
import { _getAllAccessory, _updateAccessory } from '../../../../services/accessoryService';
import AutomobilesDialog from '../../../../shared/components/AutomobilesDialog';
import Grid from '../../../../shared/components/Grid';


const AdminAccessoryList = () => {

    const [showDialog, setShowDialog] = React.useState(false)

    const [currentAccessory, setCurrentAccessory] = React.useState({
        name: '',
        companyName: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        emailId: '',
        status: ''
    })

    const [allAccessory, setAllAccessory] = React.useState([])
    const [allColumn] = React.useState([
        { lable: 'Name', property: 'name' },
        { lable: 'Company Name', property: 'companyName' },
        { lable: 'Description', property: 'description' },
        { lable: 'Price', property: 'price' },
        { lable: 'Quantity', property: 'quantity' },
        { lable: 'Category', property: 'category' },
        { lable: 'Employee Email Id', property: 'emailId' },
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
        { lable: 'Employee Email Id', property: 'emailId' },
        { lable: 'Status', property: 'status' }
    ])

    React.useEffect(() => {
        getAllAccessory()
    }, [])

    const getAllAccessory=()=>{
        _getAllAccessory().then(result => {
            setAllAccessory(result.data)
        })
    }

    // const getAllAccessory = () => {
    //     _getAllAccessory().then(result => {
    //         let filteredAccessory = result.data.filter((accessory) => {
    //             switch (accessory.status) {
    //                 case 'N':
    //                     accessory.status = 'Inactive'
    //                     return accessory
    //                 case 'R':
    //                     accessory.status = 'Rejected'
    //                     return accessory
    //                 case 'Y':
    //                     accessory.status = 'Active'
    //                     return accessory
    //                 default:
    //                     return accessory
    //             }
    //         })
    //         setAllAccessory(filteredAccessory)
    //     })
    // }

    // const updateAccessory = (currentAccessory, newStatus) => {
    //     console.log(currentAccessory, newStatus);
    //     currentAccessory.status = newStatus
    //     _updateAccessory(currentAccessory).then((result) => {
    //         getAllAccessory()
    //     })
    // }

    const viewRecord = (accessory) => {
        setCurrentAccessory(accessory)
        setShowDialog(true)
    }

    return (
        <div>
            <Grid records={allAccessory}
                columns={allColumn}
                type="admin-accessory"
                // updateAccessory={(currentAccessory, newStatus) => updateAccessory(currentAccessory, newStatus)}
                viewRecord={(record) => viewRecord(record)} />

            <AutomobilesDialog columns={dialogColumns} record={currentAccessory}
                showDialog={showDialog}
                title={currentAccessory.name}
                setShowDialog={() => setShowDialog(false)} />
        </div>
    );
}

export default AdminAccessoryList;


// display all products from db here !
