import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames , getAllGenres, filterGenre, filterCreated, orderByAsc, orderByRating} from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado'
import SearchBar from './SearchBar';

import styles from './Paginado.module.css'




export default function Home() {
    const dispatch = useDispatch()
    const totalVideogames = useSelector((state) => state.videogames)
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [videogamesPerPage, setVideogamesPerPage] = useState(15)
    const indexLastVideogame = currentPage * videogamesPerPage// en un principio 15
    const indexFirstVideogame = indexLastVideogame - videogamesPerPage// en un principio 0
    const currentVideogames = totalVideogames.slice(indexFirstVideogame, indexLastVideogame)
    
    //divide el array en paginas
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)}
        
    const gen = useSelector((state) => state.allgenres);
             useEffect(() => {
             dispatch(getAllGenres());
             },[dispatch])
    
            

    useEffect(() => {
      dispatch(getAllVideogames());
    },[dispatch])
   
    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllVideogames());
    }
  
    function handleFilterGenre(e){
       dispatch(filterGenre(e.target.value))
    
    }
    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
     
     }
     function handlesort(e){
         e.preventDefault();
            dispatch(orderByAsc(e.target.value))
            setCurrentPage(1);
            setOrden(`Ordenado ${e.target.value}`);
     }
     function handlesort2(e){
        e.preventDefault();
           dispatch(orderByRating(e.target.value))
           setCurrentPage(1);
           setOrden(`Ordenado ${e.target.value}`);
    }
return (
    
    <div>
        
        <h1 className= {styles.letra}>VIDEOGAMES</h1>
        <br></br>
        
        <button  className= {styles.btn} onClick= {e=> handleClick(e)}>
            refresh all videogames
        </button>
        <br></br>
        <br></br>
        
        
        <Link className= {styles.btn} to= '/videogame'>create videogame</Link>
      <br></br>
      <br></br>
        <SearchBar/>
        <br></br>
        
        <div>
      
            
            <select className= {styles.btn} onChange= {(e) => handlesort(e)}>
                <option value= 'asc' >A-Z</option>
                <option value= 'desc'>Z-A</option>
            </select>
            
            <select className= {styles.btn} onChange= {(e) => handlesort2(e)}>
                <option value = '-/+'> rating MIN-MAX</option>
                <option value = '+/-'>rating MAX-MIN</option>
            </select>
            <select className= {styles.btn} onChange= {(e) => handleFilterGenre(e)}>
                
           {gen.length>0? (gen?.map(el=> {
                       return<option value={el.name}> {el.name}  </option>
                     })
                     ) :
                     (
                         <option>loading...</option>
                     )}
                
                
               
            </select>
            <select className= {styles.btn} onChange= {e => handleFilterCreated(e)}>
                {/* <option value= 'All'>All</option> */}
                <option value= 'Created'>Created</option>
                <option value= 'Existing'>Exists</option>
            </select>
    <Paginado videogamesPerPage = {videogamesPerPage}
    totalVideogames={totalVideogames.length}
    Paginado = {paginado}/>
    {
        currentVideogames?.map((el) => {
            
            return(
                <div classname = {styles.container}>
                         <Link classname= {styles.sub} to = {'/videogames/' + el.id } >
                    <Card  name={el.name} image={el.image? el.image : <img src= 'https://bookface-images.s3.amazonaws.com/small_logos/d4face92a7abc37a414e0bc3acf4ff23ec588438.png' alt = ''/>} genre={el.genres + ''} rating={el.rating} key={el.id} id={el.id} />
                   </Link>
                    </div>
                    );
                })}
    </div>
        </div>

    )
}


 
                  