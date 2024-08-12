import {Router} from 'express';
import { getAllParkingTransactions, getParkingTransactionById, releaseParkingTransaction, createParkingTransaction } from '../controllers/parkingTransaction.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

//secured routes
router.route("/").get(verifyJWT, getAllParkingTransactions);
router.route("/:id").get(verifyJWT, getParkingTransactionById);
router.route("/").post(verifyJWT, createParkingTransaction);
router.route("/:id").patch(verifyJWT, releaseParkingTransaction);

export default router;