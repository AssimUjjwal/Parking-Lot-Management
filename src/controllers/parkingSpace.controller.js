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

// get parking space by id from the mongo database 
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

export const getAvailableParkingSpacesByLevel = async (req, res) => {
    try {
        const availableSpacesByLevel = await ParkingSpace.aggregate([
            {
                $match: {
                    isAvailable: true
                }
            },
            {
                $lookup: {
                    from: 'parkinglevels',
                    localField: 'parkingLevelId',
                    foreignField: '_id',
                    as: 'parkingLevel'
                }
            },
            {
                $unwind: '$parkingLevel'
            },
            {
                $group: {
                    _id: '$parkingLevel.title', 
                    count: { $sum: 1 },
                    spaces: {
                        $push: {
                            _id: '$_id',
                            type: '$type'
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    count: 1,
                    spaces: 1
                }
            }
        ]);

        res.status(200).json(availableSpacesByLevel);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};