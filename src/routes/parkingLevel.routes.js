import { Router } from "express";
import { getAllParkingLevels, getParkingLevelById } from "../controllers/parkingLevel.controller.js";
const router = Router()

router.route("/").get(getAllParkingLevels)
router.route("/:id").get(getParkingLevelById)

export default router