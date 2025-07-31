import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@mui/material';

const AutomobilesDialog = ({ record, columns, showDialog, title, setShowDialog }) => {
    return (
        <Dialog open={showDialog} fullWidth={true}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <table className='table table-hover'>
                    <tbody>
                        {
                            columns.map(column => (
                                <tr key={column.lable}>
                                    <td><b>{column.lable}</b></td>
                                    <td>{record[column.property]}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='info'
                    onClick={() => setShowDialog()}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AutomobilesDialog;
