import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameVideogame } from '../actions'; 
import styles from './Paginado.module.css'

export default function SearchBar() {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  function handleInputChange(e) {
      e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault()
    if(name.length> 0 ){
    dispatch(getNameVideogame(name))
    setName('')}
    else {
      alert('Please enter a valid name')
    }
  }

  return (
    <div>
      <input className= {styles.btn}
        type="text"
        placeholder="Search for a videogame"
        onChange={(e) => handleInputChange(e)}
      />
      <button className= {styles.btn} type="submit" onClick = {(e)=> handleSubmit(e)}>Search</button>
</div>
  );
}