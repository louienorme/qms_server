import mongoose, { Schema } from 'mongoose';
import IWindowAccount from './_interface';

const WindowAccountSchema: Schema = new Schema(
    {
        adminId : {
            type: String
        },
        type : {
            type: String
        },
        status: {
            type: Number
        },
        queueName: {
            type: String
        },
        station: {
            type: Number
        },
        window: {
            type: Number
        },
        username: {
            type: String
        },
        password: {
            type: String
        },
        isArchived: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IWindowAccount>('WindowAccount', WindowAccountSchema);