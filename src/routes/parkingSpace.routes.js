import { Router } from 'express';
import { getAllParkingSpaces, getParkingSpaceById} from '../controllers/parkingSpace.controller.js';

const router = Router();

router.route("/").get(getAllParkingSpaces);
router.route("/:id").get(getParkingSpaceById);

export default router;