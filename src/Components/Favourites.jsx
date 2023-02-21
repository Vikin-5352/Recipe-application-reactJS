import { useGlobalContext } from "../Context";

const Favourites=()=>{
    const {favourites, selectMeal, removeFavourites}=useGlobalContext();

    return (
        <section className="favourites">
            <div className="favourites-content">
                <h5>Favourites</h5>
                <div className="favourites-container">
                    {favourites.map((item)=>{
                        const {idMeal,strMealThumb:image}=item;
                        return <div className="favourites-item" key={idMeal}>
                            <img src={image} alt="fav_meal"className="favourites-img img" onClick={()=>selectMeal(idMeal,true)}/>
                            <button className="remove-btn" onClick={()=>removeFavourites(idMeal)}>REMOVE</button>
                            </div>
                    })}
                </div>
            </div>
        </section>
    );
}

export default Favourites;