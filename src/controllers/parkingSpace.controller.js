import {ParkingSpace} from '../models/parkingSpace.model.js';

export const getAllParkingSpaces = async (req, res) => {
    try {
        const { type, parkingLevelId, isAvailable } = req.query;
        let filter = {};

        if (type) filter.type = type;
        if (parkingLevelId) filter.parkingLevelId = parkingLevelId;
        if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';

        const parkingSpaces = await ParkingSpace.find(filter);
        res.json(parkingSpaces);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getParkingSpaceById = async (req, res) => {
    try {
        const parkingSpace = await ParkingSpace.findById(req.params.id);
        if (!parkingSpace) {
            return res.status(404).json({ message: "Parking space not found" });
        }
        res.json(parkingSpace);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
