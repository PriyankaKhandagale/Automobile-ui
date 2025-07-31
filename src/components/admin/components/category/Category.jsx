import React from 'react';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';

const Category = () => {

    const [showCategory, setShowCategory] = React.useState(false)
    const [currentCategory, setCurrentCategory] = React.useState({
        id: '',
        name: ''
    })

    return (
        <>
            <CategoryForm
                setShowCategory={(flag) => setShowCategory(flag)}
                currentCategory={currentCategory}
                setCurrentCategory={(category) => setCurrentCategory(category)} />
            <CategoryList
                setShowCategory={(flag) => setShowCategory(flag)}
                showCategory={showCategory}
                setCurrentCategory={(category) => setCurrentCategory(category)} />
        </>
    );
}

export default Category;
