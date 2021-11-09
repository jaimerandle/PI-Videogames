import React from 'react';
import  styles  from './Paginado.module.css'


export default function Paginado({videogamesPerPage, totalVideogames, Paginado}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="paginado">
        {pageNumbers && pageNumbers.map(number => {return(
          
          <li className={styles.numbers} key={number}>
            <button className= {styles.btn} onClick={(e) => Paginado(number)}>
              {number}
            </button>
          </li>
        )})}
      </ul>
    </nav>
  );
        }