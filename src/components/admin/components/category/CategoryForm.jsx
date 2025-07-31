import { Button, TextField } from '@mui/material';
import React from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { _createCategory, _getAllCategory, _updateCategory } from '../../../../services/categoryService';
import { useDispatch, useSelector } from 'react-redux';
import { showNotificationAction } from '../../../../store/actions/notification/notificationAction';

const CategoryForm = ({ setShowCategory, currentCategory, setCurrentCategory }) => {

    const dispatch = useDispatch()

    const addCategoryStyle = {
        position: 'absolute',
        right: '30px'
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setCurrentCategory({
            ...currentCategory,
            [name]: value
        })
    }

    const createCategory = async () => {
        // console.log('in createCategory');
        let isExist = await isCategoryExistByCategoryName(currentCategory.name);
        // console.log(isExist);
        // console.log('Next LOC....');

        if (!isExist) {
            _createCategory(currentCategory).then(result => {
                // console.log(result.data);
                if (result.status === 201) {
                    dispatch(showNotificationAction('Category Created Successfully !'))
                    setShowCategory(true)
                }
            })
        } else {
            dispatch(showNotificationAction('Category is already exist !'))
        }
        clearCategory()
    }

    const clearCategory = () => {
        setCurrentCategory({
            id: '',
            name: ''
        })
    }

    const updateCategory = async () => {
        // console.log(currentCategory);
        let isExist = await isCategoryExistByCategoryName(currentCategory.name);

        if (!isExist) {
            _updateCategory(currentCategory).then(result => {
                if (result.status === 200) {
                    dispatch(showNotificationAction('Category Updated Successfully !'))
                    setShowCategory(true)
                }
            })
        } else {
            dispatch(showNotificationAction('Category is already exist !'))
        }
        clearCategory()
    }

    const isCategoryExistByCategoryName = (categoryName) => {
        return new Promise((resolve) => {
            _getAllCategory().then(result => {
                let allCategory = result.data
                // console.log(allCategory);
                let allCategoryName = allCategory.map(category => category.name.toUpperCase())
                // console.log(categoryName.toUpperCase());
                // console.log(allCategoryName);
                let isCategoryExist = allCategoryName.includes(categoryName.toUpperCase())
                // console.log(isCategoryExist);
                resolve(isCategoryExist)
            })
        })
    }

    return (
        <>
            <TextField variant='standard' placeholder='Category Name'
                value={currentCategory.name}
                name="name"
                onChange={(e) => handleChange(e)} />
            {
                currentCategory.id === '' ?
                    <Button variant='contained' style={addCategoryStyle} color='success'
                        onClick={() => createCategory()}>
                        <SaveIcon /> Create
                    </Button> :
                    <Button variant='contained' style={addCategoryStyle} color='primary'
                        onClick={() => updateCategory()}>
                        <SaveIcon /> Update
                    </Button>
            }
            <hr className='auto-hr' />
        </>
    );
}

export default CategoryForm;
