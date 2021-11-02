import mongoose, { Schema } from 'mongoose';
import IWindow from './_interface';

const WindowSchema: Schema = new Schema(
    {
        windowId: {
            type: String
        },
        queueName: {
            type: String
        },
        stationNumber: {
            type: Number
        },
        status: {
            type: String
        },
        windowNumber: {
            type: Number
        },
        admin: {
            type: String
        }
    },
    {
        timestamps: true
    }

)

export default mongoose.model<IWindow>('Window', WindowSchema);