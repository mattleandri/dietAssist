import { Router } from "express";
import { getPatients } from "../controllers/verPacientes.js";
import validJWT from "../helpers/validJWT.js";

const verPacientesRouter = Router()


verPacientesRouter.use(validJWT)

//  #security: $set: '#components/securitySchemas/bearerAuth'       !! corregir

/**
 * @swagger
 * /getPatients:
 *  get:
 *      tags:
 *          - verPacientes
 *      summary: get all Patients from user logged
 *      responses:
 *          '200':
 *              description: got all Patients succesfullly
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          required: true
 *          
 */
verPacientesRouter.get('/',getPatients)

export default verPacientesRouter