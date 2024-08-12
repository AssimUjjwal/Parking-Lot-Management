import mongoose, {Schema} from "mongoose";

const parkingSpaceSchema = new mongoose.Schema({
    parkingTransactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParkingTransaction',
        default: null,
    },
    type: {
        type: String,
        required: true,
        enum: ['2-wheeler', '4-wheeler'],
    },
    parkingLevelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParkingLevel',
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
});

export const ParkingSpace = mongoose.model('ParkingSpace', parkingSpaceSchema);
