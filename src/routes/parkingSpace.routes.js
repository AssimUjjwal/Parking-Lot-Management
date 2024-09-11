import { Router } from 'express';
import { getAllParkingSpaces, getParkingSpaceById, getAvailableParkingSpacesByLevel} from '../controllers/parkingSpace.controller.js';

const router = Router();

router.route("/").get(getAllParkingSpaces);
router.route('/available-by-level').get(getAvailableParkingSpacesByLevel);
router.route("/:id").get(getParkingSpaceById);

export default router;