import mongoose, { Schema } from 'mongoose';
import IFlashboard from './_interface';

const FlashboardSchema: Schema = new Schema(
    {
        flashboardId : {
            type: String
        },
        type: {
            type: String
        },
        status: {
            type: Boolean
        },
        queueName: {
            type: String
        },
        station: {
            type: String
        },
        username: {
            type: String
        },
        password: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IFlashboard>('Flashboard', FlashboardSchema);