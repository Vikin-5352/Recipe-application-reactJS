import { useGlobalContext } from "../Context";
//import { useContext, useEffect } from "react";
import {BiLike} from 'react-icons/bi';

const Meals=()=>{
    const {meals,loading,selectMeal,addToFavourites,favourites}=useGlobalContext();
   // console.log(meals);
   // console.log("inside meals",)
    console.log("Meals component",favourites);
    // const context_1=useContext(AppContext);
    // console.log("2nd log",context_1)
    if(loading)
    {
        return <h4 className="section">loading...</h4>
    }
    if(meals.length<1)
    {
        return <h4 className="section">No data has been received from the server</h4>
    }

    return (<section className="section-center">
        {meals.map((singleMeal)=>{
            //console.log(singleMeal)
            const {idMeal,strMeal:title,strMealThumb:image}=singleMeal;

           return (<artcile key={idMeal} className="single-meal">
            <img src={image} className="img" alt="img" onClick={()=>selectMeal(idMeal)}/>
            <footer>
                <h5>{title}</h5>
                <button className="like-btn" onClick={()=>addToFavourites(idMeal)}><BiLike /></button>
            </footer>
           </artcile>);
        })}
    </section>);
}

export default Meals;