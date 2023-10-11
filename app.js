//DB
//import dbConnection from './DB/dbConnection.js';


import 'dotenv/config.js'
import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors';
import swaggerUi from 'swagger-ui-express'




//Doc
import { openApiSpecification } from './docs/openApiSpecification.js';

//Routes
import createPlanRouter from './routes/createPlan.js';
import pacientesRouter from './routes/pacientes.js'
import authRouter from './routes/auth.js';
import serviciosRouter from './routes/servicios.js';
import panelRouter from './routes/panel.js';


//Helpers
import validJWT from './helpers/validJWT.js';

const app = express()
const PORT = process.env.PORT || 3000;



app.set('view engine', 'ejs'); //To use ejs files

//De momento Habilitar CORS para todos los orígenes para entorno de produccion 
app.use(cors());
app.use(express.json())

app.use("/api-doc",swaggerUi.serve,swaggerUi.setup(openApiSpecification))



app.use("/auth",authRouter)
app.use("/panel",panelRouter)
app.use("/servicios",serviciosRouter)
app.use("/createPlan",createPlanRouter)
app.use("/verPacientes",pacientesRouter)




async function main() {
  try{
    // await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@diet-assist-db.lskotyy.mongodb.net/dietAssist?retryWrites=true&w=majority`, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   })

    //await dbConnection()

    app.listen(PORT,console.log(`All good :) executing in ${PORT}`)) //Me aseguro de primero conecatarme a la DB

  }catch(err){
    console.log("Ops. "+err)
    process.exit(1)
  }
    
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/<dbName>');` if your database has auth enabled
}

 main()
