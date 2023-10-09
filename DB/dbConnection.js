import mongoose from "mongoose";
//import { plansSchema,userSchema,patientSchema } from "../schemas";

import { plansSchema } from "../schemas/groups.js";
import { userSchema } from "../schemas/users.js";
import { patientSchema } from "../schemas/patients.js";


//async function dbConntection(){


    console.log('Entro a fn DB')

    export const dietAssistDB =  mongoose.createConnection(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@diet-assist-db.lskotyy.mongodb.net/dietAssist?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    
    dietAssistDB.model('plans',plansSchema)
    dietAssistDB.model('users',userSchema)
    dietAssistDB.model('patients', patientSchema)
    
    export const  alimentosDB = mongoose.createConnection(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@diet-assist-db.lskotyy.mongodb.net/Alimentos?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    // /return {dietAssistDB,alimentosDB}
//}



//const {dietAssistDB,alimentosDB} = dbConntection()
//export {dietAssistDB,alimentosDB}


