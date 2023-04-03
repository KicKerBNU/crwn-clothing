import DirectoryItem from '../directory-item/directory-item.jsx';
import {CategoryMenuContainer} from "./category-menu.styles.jsx";


const CategoryMenu = ({categories}) => {
    return (
        <CategoryMenuContainer>
            {categories.map((category) => (
                <DirectoryItem key={category.id} category={category} />
            ))}
        </CategoryMenuContainer>
    )

}

export default CategoryMenu;