import { Router } from "express";
import { getPatients,newPatient,deletePatient } from "../controllers/pacientes.js";
import validJWT from "../middlewares/validJWT.js";

const pacientesRouter = Router()


// TODO: CAMBIAR "ver"Pacientes. Parece una ruta de front... La ruta de pacientes tendra los controladores
// para su uso general. Sea desde cualquier pantalla del front.

//

pacientesRouter.use(validJWT)

//  #security: $ref: '#components/securitySchemas/bearerAuth'       !! corregir


/**
 * @swagger
 * /pacientes/getPatients:
 *  get:
 *      tags:
 *          - Pacientes
 *      summary: Get all Patients (id,name.surname) from user logged
 *      security:
 *          - bearerAuth: []
 *      description: The authenticated user's username will be available in req.username thanks to the validJWT middleware.
 *      responses:
 *          '200':
 *              description: got all Patients succesfully
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  name:
 *                                      type: string
 *                                  surname:
 *                                      type: string
 *                                  _id:
 *                                      type: string
 * 
 *
 */
pacientesRouter.get('/getPatients',getPatients)
pacientesRouter.post('/newPatient',newPatient)
pacientesRouter.delete('/deletePatient',deletePatient)

export default pacientesRouter