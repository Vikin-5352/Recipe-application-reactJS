import {useState} from 'react'
import { useGlobalContext } from '../Context';
const Search=()=>{
    console.log("search component")
    const [text,setText,]=useState('');
    const {setSearchTerm,fetchRandomMeal}=useGlobalContext();


    const handleChange=(e)=>{
        console.log(e.target.value)
        setText(e.target.value);
    }

    const handleSubmit=(e)=>{
        console.log("inside handleSubmit")
        e.preventDefault();
        console.log(text);
        if(text){
            console.log("inside if of handleSubmit")
            setSearchTerm(text);
            setText('');
        }
    }
const handleRandomMeal=()=>{
    setSearchTerm('');
    setText('');
    fetchRandomMeal();
}
    return (
    <header className='search-container' onSubmit={handleSubmit}>
        <form>
            <input type="text" onChange={handleChange} value={text} placeholder='Type favourite meal' className='form-input'/>
            <button type='submit'   className='btn'>Search</button>
            <button type='button' onClick={handleRandomMeal} className='btn btn-hipster'> Surprise me!</button>
        </form>
    </header>
    );
}

export default Search;