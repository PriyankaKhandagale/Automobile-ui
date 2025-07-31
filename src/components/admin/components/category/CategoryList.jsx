import React from 'react';
import { _getAllCategory, _getCurrentCategoryById, _deleteCategory } from '../../../../services/categoryService';
import Grid from '../../../../shared/components/Grid';
import { useDispatch } from 'react-redux'
import { showNotificationAction } from '../../../../store/actions/notification/notificationAction';

const CategoryList = ({ showCategory, setCurrentCategory, setShowCategory }) => {

    const dispatch = useDispatch()

    const [allColumn] = React.useState([
        { lable: 'Id', property: 'id' },
        { lable: 'Name', property: 'name' },
        { lable: 'Action', property: 'action' }
    ])
    const [allCategory, setAllCategory] = React.useState([])

    React.useEffect(() => {
        getAllCategory()
    }, [showCategory])

    const getAllCategory = () => {
        _getAllCategory().then(result => {
            setAllCategory(result.data)
            setShowCategory(false)
        })
    }

    const deleteCategory = (id) => {
        // console.log(id);
        _deleteCategory(id).then(result => {
            dispatch(showNotificationAction('Category Deleted Successfully !'))
            getAllCategory()
        })
    }

    const viewCategory = (category) => {
        console.log(category);
    }

    const editCategory = (id) => {
        console.log(id);
        _getCurrentCategoryById(id).then(result => {
            setCurrentCategory(result.data)
        })
        // ToDo - we will call _getCurrentCategoryById(id)
    }

    return (
        <>
            <hr style={{ marginTop: '25px' }} />
            <Grid records={allCategory}
                columns={allColumn}
                deleteRecord={(id) => deleteCategory(id)}
                viewRecord={(category) => viewCategory(category)}
                editRecord={(id) => editCategory(id)}
                type="admin-category" />
        </>
    );
}

export default CategoryList;
