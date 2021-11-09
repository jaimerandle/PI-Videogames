import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css' ;


export default function Card({name, image, genre, rating,id}){
    
    return (

        <div className = {styles.row}>
    <div className = {styles.column}>
        <div className={styles.card}>
        <div className={styles.container}>
            <Link className = {styles.sub} to={`/videogames/${id}`}>
            <h1 >{name} </h1>
            <h2>{genre}</h2>
            <h3>{rating}</h3>
            <img src={image} alt= 'img not found' width= '400px' height='250px'/>
            </Link>
            </div>
        </div>
    </div>
    </div>
    )
}