import { ParkingLevel } from '../models/parkingLevel.model.js';
import { ParkingSpace } from '../models/parkingSpace.model.js';

const createDefaultData = async () => {
    try {
        const levelsCount = await ParkingLevel.countDocuments({});
        
        if (levelsCount === 0) {
            const levels = [];
            for (let i = 1; i <= 5; i++) {
                levels.push({ title: `Level ${i}` });
            }
            const createdLevels = await ParkingLevel.insertMany(levels);

            for (const level of createdLevels) {
                const spaces = [];
                for (let j = 1; j <= 20; j++) {
                    spaces.push({
                        type: j % 2 === 0 ? '2-wheeler' : '4-wheeler',
                        parkingLevelId: level._id
                    });
                }
                await ParkingSpace.insertMany(spaces);
            }

            console.log('Default parking levels and spaces created.');
        } else {
            console.log('Parking levels already exist.');
        }
    } catch (err) {
        console.error('Error setting up default data:', err);
    }
};

export default createDefaultData;