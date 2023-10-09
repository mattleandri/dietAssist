import  swaggerJsdoc from 'swagger-jsdoc'
import { fileURLToPath } from 'url';
import { dirname,join } from 'path';

const ubicacion = dirname(fileURLToPath(import.meta.url))

//crearSnippet
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        titlle:'DIET-ASSIST-API',
        version:'1.0.0'
    },
    servers:[
        {url:`https://localhost:3000`}
    ],
    components:{
        secutitySchemes:{
            bearerAuth:{
                type:"https",
                scheme:"bearer",
                descprition: "JWT in Authorization Headers with Bearer. Payloads includes: username"
            }
        },
        schemas:{
            
        }
    },
}


const options = {
    swaggerDefinition,
    apis: [`${join(ubicacion,'../routes/*.js')}`],
}




export const openApiSpecification = swaggerJsdoc(options);
//console.log(openApiSpecification)
