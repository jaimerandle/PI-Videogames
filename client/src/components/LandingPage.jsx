import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function LandingPage(){
    return(
        <div className={styles.imagen}>
            <h1 className= {styles.titulo}>WELCOME TO MY FIRST APP!</h1>
            <Link to="/home">
                <button className = {styles.boton}>HOME</button>
            </Link>
            <div className = {styles.linkedin}>
                <a className={styles.link} href="https://www.linkedin.com/in/jaime-randle-b4b419186/" >
                🙋‍♂️ if you want to be my friend on linkedin, click here! 🙋‍♂️
                </a>
            </div>
        </div>
    )
}