import axios from 'axios';


export function getAllVideogames() {
  return async function(dispatch) {
    const json = await axios.get('http://localhost:3001/videogames',{
    

    });
     return dispatch({
          type: 'GET_VIDEOGAME',
           payload: json.data});

      
      }
  };
  export function getAllGenres(){
       return async function(dispatch) {
      const json = await axios.get('http://localhost:3001/genre');
      dispatch
        ({
       type: 'GET_ALLGENRE',
       payload: json.data});
    
      } }
      export function postVideogames(videogame){
        return async function(dispatch) {
          const json = await axios.post('http://localhost:3001/videogame',videogame);
          return json;
          }
      }
    

    export function filterGenre(payload){
        return{
            type: 'FILTER_GENRE',
            payload
        }
    }

    export function filterCreated(payload){
        return{
            type: 'FILTER_CREATED',
            payload
        }
    }
    export function orderByAsc(payload){
        return{
            type: 'ORDER_BY_NAME',
            payload
        }
    }
    export function orderByRating(payload){
        return{
            type: 'ORDER_BY_RATING',
            payload
        }
    }
    export function getNameVideogame(name){
        return async function(dispatch) {
            try{
            let json = await axios.get('http://localhost:3001/videogames?name=' + name);
             return dispatch
                ({
                type: 'GET_VIDEOGAME_NAME',
                payload: json.data});
                
            }
            catch(err){
                console.log(err)}}
            
            }
            export function Clear(){
                return {
                    type : 'CLEAR'
                }
            }
            export function getDetail(id){
                return async function(dispatch) {
                    try{
                        var json = await axios.get('http://localhost:3001/videogames/' + id);
                        return dispatch
                            ({
                                type: 'GET_DETAILS',
                                payload: json.data});
                    }catch(err){
                        console.log(err);
                    }}

            }
   
                