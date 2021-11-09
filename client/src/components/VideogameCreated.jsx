import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {postVideogames, getAllGenres} from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Paginado.module.css'


export default function VideoGameCreate(){
    const history = useHistory();
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.allgenres);
    console.log(genres);
    
    const platforms = [{id:1, name:'PC'},{id:2, name:'Playstation 3'},{id:3, name:'Playstation 4'},{id:4, name:'PC'},{id:5, name:'Xbox 360'},{id:6, name:'Xbox one'},{id:7, name:'Xbox series s/x'},{id:8, name:'MacOS'},{id:9, name:'Android'},{id:10, name:'Web'},{id:11, name:'Ps vita'},{id:12, name:'Linux'}];
    

    const [input, setImput] = useState({
        name: '',
        description: '',
        released: '',
        genres : [],
        platforms:[]
    })
    function handleChange(e){
        setImput({
            ...input,
            [e.target.name]: e.target.value
        })
    console.log(input)
    }
        function handleSelect(e){
            setImput({
                ...input ,
                genres :[...input.genres, e.target.value]
            })
            console.log(input)
        }
        function handlePlat(e){
            setImput({
                ...input ,
                platforms :[...input.platforms, e.target.value]
            })
            console.log(input)
        }

        function handleSubmit(e){
            e.preventDefault();
            console.log(input)
            dispatch(postVideogames(input));
            alert('Video Game Created!')
            setImput({name: '',
            description: '',
            released: '',
            genres : [],
            platforms:[]})
            history.push('/home');
        }

        function handleDelete(e){
           
            setImput({
                ...input,
                genres :input.genres.filter(genre => genre !== e),
                platforms :input.platforms.filter(platform => platform !== e)
            })
        }

    useEffect(() => {
        dispatch(getAllGenres());
    }, [])
    return(
        <div>
            <br></br>
            <h1 className= {styles.letra}>CREATE NEW VIDEOGAME!</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label className= {styles.name}>Name: </label>
                    <input className= {styles.name}  placeholder="new name..." type="text" value={input.name} name='name'onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label className= {styles.name} >Description: </label>
                    <input className= {styles.name}  maxlength = '220'  placeholder="description..."type="text" value={input.description} name='description' onChange={(e)=>handleChange(e)}/>
                </div>
                <div>  
                    <label className= {styles.name}>Released </label>
                    <input className= {styles.name}type="date" value={input.released} name='released' onChange={(e)=>handleChange(e)}/>
                </div>
                <label className= {styles.name}>Genre </label>
                <select className= {styles.name}onChange={(e)=> handleSelect(e)}>
                  {genres.map((genres) => (<option value={genres.name}>{genres.name}</option>))}
              </select> 
              <div/> 
               <label className= {styles.name} >Platform </label>
            <select className= {styles.name} onChange={(e)=> handlePlat(e)}>
                   {platforms.map((platforms) => (<option value={platforms.name}>{platforms.name}</option>))}
               </select> 
               <div/>
                { <ul><li>{input.genres.map(el => el + ',')}</li></ul>  } 
                { <ul><li>{input.platforms.map(el => el + ',')}</li></ul>  } 
               <button className= {styles.btn} type = 'submit'>Create new Videogame!</button>
            </form>
            {input.genres.map(el =>
                <div>
                    <p>{el}</p>
                    <button onClick={()=> handleDelete(el)}>X</button>
                </div>)}
                {input.platforms.map(el =>
                <div>
                    <p>{el}</p>
                    <button onClick={()=> handleDelete(el)}>X</button>
                </div>)}
                <br></br>
                <Link to = '/home'><button className= {styles.btn}>Go back</button></Link>
        </div>
    )
        
}