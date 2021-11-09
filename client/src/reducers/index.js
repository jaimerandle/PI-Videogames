const initialState = {
    videogames: [],
    video: [],
    allgenres: [],
    allplatforms: [],
    detail:{}

}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_VIDEOGAME':
            return {
                ...state,
                videogames: action.payload,
                video: action.payload
            }
        case 'GET_VIDEOGAME_NAME':
            return {
                ...state,
                videogames: action.payload
            }
        

        case 'GET_ALLGENRE':
            return {
                ...state,
                allgenres: action.payload,
            };


        case 'FILTER_GENRE':


            const allgenres = state.video
            console.log(allgenres)
            const genreFilter = allgenres.filter((e) => e.genres?.includes(action.payload))
            console.log(genreFilter)



            return {
                ...state,
                videogames: genreFilter
            }



        case 'FILTER_CREATED':
            const allVideogames = state.video
            const createdFilter = action.payload === 'Created' ? allVideogames.filter(e => e.createdInDb) : allVideogames.filter(e => !e.createdInDb)
            return {

                ...state,
                videogames: action.payload === 'All' ? allVideogames : createdFilter
            }

        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' ?
                state.videogames.sort(function (a, b) {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                }) :
                state.videogames.sort(function (a, b) {
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                })
            return {
                ...state,
                video: sortedArr
            }
            case 'ORDER_BY_RATING':
            let sortedRat = action.payload === '-/+' ?
                state.videogames.sort(function (a, b) {
                    if (a.rating < b.rating) return -1;
                    if (a.rating > b.rating) return 1;
                    return 0;
                }) :
                state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) return -1;
                    if (a.rating < b.rating) return 1;
                    return 0;
                })
            return {
                ...state,
                video: sortedRat
            }
            case 'POST_VIDEOGAME':
                return {
                    ...state,
                }



                case 'GET_DETAILS':
                    
                    return {
                        ...state,
                        detail: action.payload
                    }
                    case 'CLEAR' :
                        return {
                            ...state,
                            detail : {}
                        }
                        
                        default:
                            return state
                    }
        }
                
                
export default rootReducer;