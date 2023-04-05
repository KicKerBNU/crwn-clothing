import DirectoryMenu from '../../components/category-menu/directory-menu.component';
import { Outlet } from 'react-router-dom';
const Home = () => {    
    return (
      <div>
            <Outlet />
            <DirectoryMenu  />
        </div>
        
    )
}

export default Home;
