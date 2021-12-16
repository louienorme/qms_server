import mongoose, { Schema } from 'mongoose';
import IWindowAccount from './_interface';

const WindowAccountSchema: Schema = new Schema(
    {
        adminId : {
            type: String
        },
        status: {
            type: Boolean
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
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IWindowAccount>('WindowAccount', WindowAccountSchema);