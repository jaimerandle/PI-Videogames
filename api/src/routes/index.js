const { Router } = require('express');
const axios= require ('axios');
//  const Videogame = require('../models/Videogame');
//  const genero = require('../models/genero');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

require('dotenv').config();
const{ API_KEY } = process.env
const router = Router();
 const {Videogame , Genre} = require ('../db');
// const Genre = require('../models/Genre');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const GetApiInfo= async()=> {
    
    const apione = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&page=1`)
    const apitwo = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&page=2`)
    const apithree = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=20&page=3`)
    const ApiUrl= apione.data.results.concat(apitwo.data.results,apithree.data.results)
    
     
    const ApiInfo= await ApiUrl.map(el => {
        return {
            name: el.name,
            id: el.id,
            description: el.description,
            released: el.released,
            platforms: el.platforms.map(el => el.platform.name),
            rating: el.rating,
            image : el.background_image,
            genres: el.genres.map(el => el.name)
          
        }
        
    })
//    console.log(ApiInfo, 'linea 25');
    
    return ApiInfo;
}

const GetDbInfo = async()=> {
   return await Videogame.findAll({
       include: {
           model: Genre,
           attributes: ['name'],
           through:{
           attributes:[]
           }
       }
   })

   
};
const GetAllVideogames= async ()=> {
    const ApiInfo = await GetApiInfo();
    const DbInfo  = await GetDbInfo();
    const TotalInfo = ApiInfo.concat(DbInfo)
    return TotalInfo;
}
router.get('/videogames', async (req, res)=>{
    const name= req.query.name;
let TotalVideogames = await GetAllVideogames();
if(name){
    let VideoGamesName= await TotalVideogames.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
    // VideoGamesName.length ?
    // res.status(200).send(VideoGamesName):
    // res.status(404).send('the videogame was not found')
    if(VideoGamesName){
    res.status(200).send(VideoGamesName)
    
    } else {
    res.status(404).send('the videogame was not found')
    }
    }else
    {
    res.status(200).send(TotalVideogames);
    }   
    })

router.get('/genre', async (req, res)=>{
    const generoApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    // const genres= await generoApi.data.results.map(el => el.name)
    
    // const generos = Generoapi.data.map(el=> el.name)
    // const genEach = generoApi.map(el=> {
    //     for (let i = 0; i < el.length; i++) 
    //        return  el[i]
            
    // })
    // console.log(genEach)
    generoApi.data.results.forEach(async (element) => {
       await Genre.findOrCreate({
        where: {name: element.name}

    })
        
    });
    const allGeneros = await Genre.findAll();
    res.send(allGeneros);
    // console.log(allGeneros)
})

router.post('/videogame', async (req, res)=>{
    let{
        name,
        image,
        rating,
        released,
        description,
        platforms,
        genres
    }=req.body;

    let videogameCreated= await Videogame.create ({
        name,
        image,
        rating,
        released,
        description,
        platforms,
        genres
    });
    let generobd = await Genre.findAll({
        where : {name : genres}
    })
    videogameCreated.addGenre(generobd)
    res.send('new videogame created!')
});

// router.get('/videogames/:id', async (req,res)=>{
//     const id = req.params.id;
//     const videogamesTotal = await GetAllVideogames();
//     if(id){
//         // console.log(id)
//         let videogamesId = videogamesTotal.filter((el)=> el.id == id)
//         // console.log(el)
         
//         if(videogamesId.length>0)
//         res.status(200).json(videogamesId[0])
//         else{ 
//         res.status(404).send('the videogame was not found')
//         }
//     }
// })

router.get('/videogames/:idVideogame', async (req, res, next)=>{
    try {
    const idVideogame = req.params.idVideogame;
    let juegos
    if(typeof idVideogame === 'string' && idVideogame.length > 8){
        juegos = await Videogame.findByPk(idVideogame)
        res.send(juegos)
    }else{
 juegos = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)
        juegos = juegos.data;
        juegos = {
            id: juegos.id,
            name: juegos.name,
            released: juegos.released,
            image: juegos.background_image,
            platforms: juegos.platforms.map(e => e.platform.name),
            description: juegos.description,
            rating: juegos.rating,
            ratings: juegos.ratings ,
            
     genres : juegos.genres.map(genre => genre.name)
        }
    }
    res.send(juegos)
    }catch(error){
        next(error)
}
})

module.exports = router;




