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

        const filtrado = allAlimentos.filter(alimento => alimento.name.toLocaleLowerCase().match(reg))  //leer mas de expresiones regulares. Metodos y diferencias
        //https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions


        //TODO: Posiblemente haber almacenado decimal128 en la DB sea innecesario.
        // El tipo de dato number ya deberia ser lo suficinteme  presico (64 bits en coma flotante de doble presicion)

        res.status(200).json(filtrado)

    }catch(err){
        res.status(500).json({err:err})
        console.log(err)
    }
   
} 

export const getAlimentosById = async (req,res) => {
    
    try{
        const {foodId} = req.params
        

        const db = [Carbohidratos,Proteinas,Verduras]
        let i=0 

        let food
        while(!food){
            food = await db[i].findById(foodId) 
            i++
            if(i>2)break
        }

        if(!food) return res.status(404).json({msg:'Id no existente'})

        res.status(200).json(food)

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
    
}
