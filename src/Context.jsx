import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
const AppContext = React.createContext();
const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
const AppProvider = ({ children }) => {
  const [loading, setloading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [searchTerm,setSearchTerm]=useState('');
  const [showModal,setShowModal]=useState(false);
  const [selectedMeal,setSelectedMeal]=useState(null);
  const [favourites,setFavourites]=useState([]);

  const getFavouritesFromLocalStorage=()=>{


    let favourites=localStorage.getItem('favourites');
    
    if(favourites){
      
      
      favourites=JSON.parse(favourites);
    }
    else{
      favourites=[];
    }
    console.log("outside if of getfavfrmlocalstrge");
    console.log(favourites);
    setFavourites(favourites);
  }

  const addToFavourites=(idMeal)=>{
    console.log("inside addToFavourites",idMeal);
    //console.log("Favourites",favourites)
    const alreadyFavourite=favourites.find((meal)=>{
      //console.log("inside find",meal.idMeal,meal.idMeal);
      return meal.idMeal===idMeal;
    })
    
    if(alreadyFavourite) return 
    const meal=meals.find(meal=>meal.idMeal===idMeal)
   
    const updatedFavourites=[...favourites,meal];
    setFavourites(updatedFavourites);
    localStorage.setItem('favourites',JSON.stringify(updatedFavourites));
  }
  const removeFavourites=(idMeal)=>{
    console.log("inside reomve fav function")
    const updatedFavourites= favourites.filter((meal)=>
    {
      console.log("meal.id",meal.idMeal,"idMeal",idMeal);

      return meal.idMeal!==idMeal
    })
    console.log(updatedFavourites)
    setFavourites(updatedFavourites);
    localStorage.setItem('favourites',JSON.stringify(updatedFavourites));

  }


  const fecthMeals = async (allMealsUrl) => {
    //  console.log("inside fetchMeals");
    setloading(true);
    try {
      const { data } = await axios(allMealsUrl);
      // const data = await response.json();
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
      //  console.log(data.meals);
    } catch (error) {
      console.log(error.response);
    }
    setloading(false);
  };

const fetchRandomMeal=()=>{
    fecthMeals(randomMealUrl);
}

const selectMeal = (idMeal,favouriteMeal)=>{
  console.log("inside selectMeal");
  let meal;
  if(favouriteMeal)
  {
  meal= favourites.find((meal)=>meal.idMeal===idMeal);
  }
  else{
  meal=meals.find((meal)=>meal.idMeal===idMeal);
  }
  setSelectedMeal(meal);
  setShowModal(true);

}

const closeModal=()=>{
  setShowModal(false);
}

useEffect(()=>{
    fecthMeals(allMealsUrl);
},[])

  useEffect(()=>{
    console.log("inside useEffect")
    getFavouritesFromLocalStorage();
  },[])

  useEffect(() => {
    console.log("(inside effect)fecthing data.......");
    if(!searchTerm) return;
    fecthMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);
  return (
    <AppContext.Provider value={{ meals, loading ,setSearchTerm,fetchRandomMeal,showModal,selectedMeal,selectMeal,closeModal,favourites,addToFavourites,removeFavourites}}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
