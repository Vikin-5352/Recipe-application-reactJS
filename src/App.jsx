import './App.css';
import Favourites from './Components/Favourites';
import Modal from './Components/Modal';
import Search from './Components/Search';
import Meals from './Components/Meals';
import { useGlobalContext } from './Context';
function App() {
  const {showModal,favourites}=useGlobalContext();
  console.log("fav",favourites);
  return (
    <main>
     <Search />
      {favourites.length>0 && <Favourites />}
      <Meals />
      {showModal&&<Modal />}
      
    </main>
  );
}

export default App;
