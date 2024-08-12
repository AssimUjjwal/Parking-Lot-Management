import { ParkingTransaction } from '../models/parkingTransaction.model.js';
import { ParkingSpace } from '../models/parkingSpace.model.js';

export const getAllParkingTransactions = async (req, res) => {
    try {
        const { userId, vehicleNo, startDate, endDate } = req.query;
        const { role, _id: currentUserId } = req.user;
        let filter = {};

        if (role === 'user') filter.userId = currentUserId;
        else if (role === 'admin' && userId) filter.userId = userId;

        if (vehicleNo) filter.vehicleNo = vehicleNo;
        if (startDate && endDate) {
            filter.bookingDateTime = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        const parkingTransactions = await ParkingTransaction.find(filter);
        res.json(parkingTransactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getParkingTransactionById = async (req, res) => {
    try {
        const parkingTransaction = await ParkingTransaction.findById(req.params.id);
        if (!parkingTransaction) {
            return res.status(404).json({ message: "Parking transaction not found" });
        }
        res.json(parkingTransaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createParkingTransaction = async (req, res) => {
    try {
        const { parkingLevelId, type, parkingSpaceId, bookingDateTime, vehicleNo } = req.body;
        const { _id: userId, role } = req.user._id;

        if (role === 'admin') {
            return res.status(403).json({ message: "Admins are not allowed to create parking transactions" });
        }

        const parkingSpace = await ParkingSpace.findById(parkingSpaceId);
        if (!parkingSpace) {
            return res.status(404).json({ message: "Parking space not found" });
        }
        if (!parkingSpace.isAvailable) {
            return res.status(400).json({ message: "Parking space is not available" });
        }

        const newParkingTransaction = new ParkingTransaction({
            parkingLevelId,
            type,
            parkingSpaceId,
            bookingDateTime,
            vehicleNo,
            userId
        });

        const savedTransaction = await newParkingTransaction.save();

        parkingSpace.isAvailable = false;
        parkingSpace.parkingTransactionId = savedTransaction._id;

        res.status(201).json(newParkingTransaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const releaseParkingTransaction = async (req, res) => {
    try {
        const { releaseDateTime } = req.body;

        const parkingTransaction = await ParkingTransaction.findById(req.params.id);
        if (!parkingTransaction) {
            return res.status(404).json({ message: "Parking transaction not found" });
        }

        parkingTransaction.releaseDateTime = releaseDateTime;
        await parkingTransaction.save();

        const parkingSpace = await ParkingSpace.findById(parkingTransaction.parkingSpaceId);

        parkingSpace.isAvailable = true;
        parkingSpace.parkingTransactionId = null;

        await parkingSpace.save();
        res.json(parkingTransaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
