import { request } from "express";
import { alimentosDB } from "../../DB/dbConnection.js";


const Carbohidratos = alimentosDB.model('carbohidratos')
const Proteinas = alimentosDB.model('proteinas')
const Verduras = alimentosDB.model('verduras')

export async function getAlimentosByName(req = request,res){

    //let allAlimentos = []

    try{
    
        const {foodName} = req.query

        if(foodName.trim().length<2) return res.status(400).json({err:'Se requieren al menos dos caracteres para realizar la busqueda'})
        
        let allAlimentos = await Carbohidratos.find({})
        const protes = await Proteinas.find({})
        allAlimentos.push(...protes)
        const verduras = await Verduras.find({})
        allAlimentos.push(...verduras) 

        const reg = new RegExp(foodName.toLocaleLowerCase())
        console.log(allAlimentos)

        const filtrado = allAlimentos.filter(alimento => alimento.name.toLocaleLowerCase().match(reg))  //leer mas de expresiones regulares. Metodos y diferencias
        //https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions

        res.status(200).json(filtrado)

    }catch(err){
        res.status(500).json({err:err})
        console.log(err)
    }
   
} 

