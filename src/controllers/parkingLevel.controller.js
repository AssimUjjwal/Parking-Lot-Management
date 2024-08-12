import {ParkingLevel} from '../models/parkingLevel.model.js';

export const getAllParkingLevels = async (req, res) => {
    try {
        const parkingLevels = await ParkingLevel.find({});
        res.json(parkingLevels);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getParkingLevelById = async (req, res) => {
    try {
        const parkingLevel = await ParkingLevel.findById(req.params.id);
        if (!parkingLevel) {
            return res.status(404).json({ message: "Parking level not found" });
        }
        res.json(parkingLevel);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};