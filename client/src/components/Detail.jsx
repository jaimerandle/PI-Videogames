import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getDetail } from '../actions/index';
import { useEffect } from 'react';
import { Clear } from '../actions/index';
export default function Detail (props){

const dispatch = useDispatch();

useEffect(() => {
  dispatch(getDetail(props.match.params.id))
  return () => {
      dispatch (Clear())}
},[dispatch])


const myDetail = useSelector(state => state.detail)
console.log(myDetail)

return (
    <div>
        {myDetail.id ?
        <div>
        <h1>Name: {myDetail.name}</h1>
         <img src={myDetail.image} alt= 'img not found' width= '400px' height='250px'/>
        <h2> Genre: {myDetail? myDetail.genres + '': myDetail.genres?.map( el =>(<div key={el}>{el.name + (' ')}</div>) )}</h2>
        <h2> Released: {myDetail.released}</h2>
        <h2> Rating: {myDetail.rating}</h2>
        <p> Description: {myDetail.description}</p> 
    </div> : <h1>Loading...</h1>}
        <Link to="/home">
            <button> Go back </button>
        </Link>
    </div>
)


}