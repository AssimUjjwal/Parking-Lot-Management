import mongoose, { Schema } from "mongoose"

const parkingLevelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    }
}, { timestamps: true });

export const ParkingLevel = mongoose.model('ParkingLevel', parkingLevelSchema);