import { Router } from "express";
import { getPatients } from "../controllers/verPacientes.js";

const verPacientesRouter = Router()

verPacientesRouter.get('/',getPatients)

export default verPacientesRouter