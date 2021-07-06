const cors = require('cors');
const express = require('express');
require('dotenv').config();
const server = express();
server.use(express.json());
server.use(cors());
const PORT = process.env.PORT;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/july6', {useNewUrlParser: true, useUnifiedTopology: true});

const MyCockTailSchema = mongoose.Schema({
    strDrink:String,
    strDrinkThumb:String,
    idDrink:String
})

const MyCocktailModel = mongoose.model('july6',MyCockTailSchema);


server.listen(PORT,console.log(`server is listening on Port number: ${PORT}`));


server.post('/addToFav',addToFavHandler);
server.get('/gettingDataFromDb',gettingDataFromDbHandler);
server.delete('/deleteFavs/:id',deleteFavsHandler);
server.put('/updateTheCards/:id',updateTheCardsHandler);

function addToFavHandler(req,res)
{
    const {strDrink,strDrinkThumb,idDrink} = req.body;
    const addererer = new MyCocktailModel({
        strDrink:strDrink,
        strDrinkThumb:strDrinkThumb,
        idDrink:idDrink
    })
    addererer.save();
    console.log(addererer);
}


function gettingDataFromDbHandler(req,res){
    MyCocktailModel.find({},(error,data)=>{
        res.send(data);
    })
}


function deleteFavsHandler(req,res){
    const {id} = req.params;
    MyCocktailModel.remove({_id:id},(error,data)=>{
        MyCocktailModel.find({},(error,data)=>{
            res.send(data);
        })
    })
}



function updateTheCardsHandler(req,res)
{
    const {strDrink,strDrinkThumb,idDrink} = req.body;
    const {id} = req.params;
    MyCocktailModel.findOne({_id:id},(error,data)=>{
        data.strDrink=strDrink,
        data.strDrinkThumb=strDrinkThumb,
        data.idDrink=idDrink,
        data.save().then(()=>{
            MyCocktailModel.find({},(error,data)=>{
                res.send(data);
            })
        })
    })
}