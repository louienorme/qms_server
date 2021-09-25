import mongoose, { Schema } from 'mongoose';
import IWindow from './_interface';

const WindowSchema: Schema = new Schema(
    {
        windowId: {
            type: String
        },
        status: {
            type: String
        },
        windowNumber: {
            type: String
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