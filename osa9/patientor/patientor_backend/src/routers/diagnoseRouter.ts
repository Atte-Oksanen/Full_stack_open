import express from "express"
import getEntries from "../services/diagnoseService"
const diagnoseRouter = express.Router()

diagnoseRouter.get('/', (_req, res) => {
  res.json(getEntries())
})

export default diagnoseRouter