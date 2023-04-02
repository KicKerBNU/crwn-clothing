import { useContext, Fragment} from 'react';
import { CategoriesContext } from '../../context/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext)
    return (
        //Fragment its a common pattern in React is for a component to return multiple elements.
        <Fragment>
                {
                    Object.keys(categoriesMap).map(title => {
                        const products = categoriesMap[title];
                        return <CategoryPreview key={title} title={title} products={products} />
                    })
                }
        </Fragment>
    )
}

export default CategoriesPreview;