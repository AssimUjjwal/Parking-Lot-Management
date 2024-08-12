import mongoose, { Schema } from "mongoose";

const parkingTransactionSchema = new mongoose.Schema({
    parkingLevelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParkingLevel',
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['2-wheeler', '4-wheeler'],
    },
    parkingSpaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParkingSpace',
        required: true,
    },
    bookingDateTime: {
        type: Date,
        required: true,
    },
    releaseDateTime: {
        type: Date,
        required: false,
    },
    vehicleNo: {
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fees: {
        type: Number,
        required: false,
    }
});

const RATE_PER_HOUR = 50;

parkingTransactionSchema.pre('save', function (next) {
    if (this.releaseDateTime && this.releaseDateTime <= this.bookingDateTime) {
        return next(new Error('Release date must be after booking date.'));
    }

    if (this.isNew || this.isModified('releaseDateTime')) {
        if (this.releaseDateTime && this.bookingDateTime) {
            const durationInHours = Math.ceil((this.releaseDateTime - this.bookingDateTime) / (1000 * 60 * 60));
            this.fees = durationInHours * RATE_PER_HOUR;
        } else {
            this.fees = 0;
        }
    }
    next();
});





export const ParkingTransaction = mongoose.model('ParkingTransaction', parkingTransactionSchema);
