import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors';
import 'dotenv/config.js'
import createPlanRouter from './routes/createPlan.js';
import verPacientesRouter from './routes/verPacientes.js'

const app = express()
const PORT = process.env.PORT || 3000;



app.set('view engine', 'ejs'); //To use ejs files

//De momento Habilitar CORS para todos los orígenes para entorno de produccion 
app.use(cors());

app.use(express.json())
app.use("/createPlan",createPlanRouter)
app.use("/verPacientes",verPacientesRouter)


async function main() {
  try{
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@diet-assist-db.lskotyy.mongodb.net/dietAssist?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })

      app.listen(PORT,console.log("All good :)")) //Me aseguro de primero conecatarme a la DB

  }catch(err){
    console.log("Ops. "+err)
    process.exit(1)
  }
    
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/<dbName>');` if your database has auth enabled
}

main()
