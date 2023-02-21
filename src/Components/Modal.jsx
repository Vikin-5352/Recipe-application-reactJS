import { useGlobalContext } from "../Context";
const Modal=()=>{
    const {selectedMeal,closeModal}=useGlobalContext();
    console.log(selectedMeal);
    const {strMealThumb:image,strMeal:title,strInstructions:text,strSource:source}=selectedMeal;
    return (
    <aside className="model-overlay">
        <div className="modal-container">
            <img src={image} alt="img" className="img modal-img"/>
            <div className="modal-content">
            <h4>{title}</h4>
            <p>Cooking Instruction</p>
            <p>{text}</p>
            <a href={source} target="_blank" rel="noreferrer">Original source</a>
            <button className="btn btn-hipster close-btn" onClick={closeModal}>Close</button>
            </div>
        </div>
    </aside>);
}

export default Modal;