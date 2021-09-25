import mongoose, { Schema } from 'mongoose';
import IFlashboard from './_interface';

const FlashboardSchema: Schema = new Schema(
    {
        flashboardId : {
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