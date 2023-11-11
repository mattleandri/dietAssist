import { Router } from "express"
import validJWT from "../middlewares/validJWT.js"
import { getPanel } from "../controllers/panel.js"


const panelRouter = Router()

panelRouter.get('/getPanel',
validJWT,
getPanel)

export default panelRouter