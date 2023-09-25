import { Router } from "express";
import { getPatients } from "../controllers/verPacientes.js";
import validJWT from "../helpers/validJWT.js";

const verPacientesRouter = Router()


verPacientesRouter.use(validJWT,)
verPacientesRouter.get('/',getPatients)

export default verPacientesRouter