import { Router } from "express";


const serviciosRouter = Router()

serviciosRouter.all('/',(req,res,send)=>{

    res.json("Redireccionado a /servicios")

})

export default serviciosRouter