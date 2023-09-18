import express from 'express';
import mongoose from 'mongoose'
import createPlanRouter from './routes/createPlan.js';

const app = express()
const PORT = process.env.PORT || 3000;



app.set('view engine', 'ejs'); //To use ejs files

app.use(express.json())
app.use("/createPlan",createPlanRouter)


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/db1', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })

    app.listen(PORT,console.log("Allgood")) //Me aseguro de primero conecatarme a la DB

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/db1');` if your database has auth enabled
}

main()
