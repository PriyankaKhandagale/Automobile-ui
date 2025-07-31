import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CancelIcon from '@mui/icons-material/Cancel';
import SellIcon from '@mui/icons-material/Sell';

const Grid = ({ records, columns, deleteRecord, viewRecord, sellRecord, editRecord, type, updateAccessory }) => {

    const getEditDeleteIcon = (record) => {
        return (
            <span>
                <EditIcon color='primary' className='pointer'
                    onClick={() => editRecord(record.id)} />
                <DeleteIcon color='error' className='pointer'
                    onClick={() => deleteRecord(record.id)} />
            </span>
        )
    }

    const getSellIcon = (record) => {
        return (
            <span>
                <SellIcon color='primary' className='pointer'
                    onClick={() => sellRecord(record.id)} />
                < VisibilityIcon color='info' className='pointer'
                    onClick={() => viewRecord(record)} />
            </span>
        )
    }

    const getEditDeleteViewIcon = (record) => {
        return (
            <span>
                <EditIcon color='primary' className='pointer'
                    onClick={() => editRecord(record.id)} />
                <DeleteIcon color='error' className='pointer'
                    onClick={() => deleteRecord(record.id)} />
                < VisibilityIcon color='info' className='pointer'
                    onClick={() => viewRecord(record)} />
            </span>
        )
    }

    const getPropertyByResult = (record, column) => {
        switch (column.property) {
            case 'action':
                switch (type) {
                    case 'admin-category':
                        return getEditDeleteIcon(record)
                    case 'admin-employee':
                        return getSellIcon(record)
                    case 'admin-accessory':
                        return < VisibilityIcon color='info' className='pointer' onClick={() => viewRecord(record)} />
                    // switch (record.status) {
                    //     case 'Active':
                    //         return <span>
                    //             <CheckCircleIcon color='primary' />
                    //             <HighlightOffIcon color='error' onClick={() => updateAccessory(record, 'R')} />
                    //         </span>
                    //     case 'Rejected':
                    //         return <span>
                    //             <CheckCircleOutlineIcon color='primary' onClick={() => updateAccessory(record, 'Y')} />
                    //             <CancelIcon color='error' />
                    //         </span>
                    //     case 'Inactive':
                    //         return <span>
                    //             <CheckCircleOutlineIcon color='primary' onClick={() => updateAccessory(record, 'Y')} />
                    //             <HighlightOffIcon color='error' onClick={() => updateAccessory(record, 'R')} />
                    //         </span>
                    // }


                    case 'manager-accessory':
                        switch (record.status) {
                            case 'Active':
                                return <span>
                                    <CheckCircleIcon color='primary' />
                                    <HighlightOffIcon color='error' onClick={() => updateAccessory(record, 'R')} />
                                    < VisibilityIcon color='info' className='pointer'
                                        onClick={() => viewRecord(record)} />
                                </span>
                            case 'Rejected':
                                return <span>
                                    <CheckCircleOutlineIcon color='primary' onClick={() => updateAccessory(record, 'Y')} />
                                    <CancelIcon color='error' />
                                    < VisibilityIcon color='info' className='pointer'
                                        onClick={() => viewRecord(record)} />
                                </span>
                            case 'Inactive':
                                return <span>
                                    <CheckCircleOutlineIcon color='primary' onClick={() => updateAccessory(record, 'Y')} />
                                    <HighlightOffIcon color='error' onClick={() => updateAccessory(record, 'R')} />
                                    < VisibilityIcon color='info' className='pointer'
                                        onClick={() => viewRecord(record)} />
                                </span>
                        }
                    case "employee-selling-accessory":
                        return < VisibilityIcon color='info' className='pointer' onClick={() => viewRecord(record)} />
                    default:
                        return getEditDeleteViewIcon(record)
                }
            default:
                return record[column.property]
        }
    }

    return (
        <table className='table table-hover'>
            <thead>
                <tr>
                    {
                        columns.map((column, index) => (
                            <th key={index}>{column.lable}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    records && records.map((record, index) => (
                        <tr key={index}>
                            {
                                columns.map((column, columnIndex) => (
                                    <td key={columnIndex}>
                                        {
                                            getPropertyByResult(record, column)
                                        }
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}


export default Grid;
