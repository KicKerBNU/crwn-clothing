import { Routes, Route} from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { useEffect } from 'react';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils.js';
import { setCategories } from '../../store/categories/category.action.js';
import { useDispatch } from 'react-redux';

const Shop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        /* TIP -> You cant use async inside useEffect, 
        you need to create another function async to get async data*/
        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments('categories');
            console.log(categoriesArray);
            dispatch(setCategories(categoriesArray));
        }
        getCategoriesMap();
    }, [dispatch]);
    return (
        <Routes>
            <Route index element={ <CategoriesPreview />}></Route>
            <Route path=':category' element={ <Category />}></Route>
        </Routes>
    )
}

export default Shop;