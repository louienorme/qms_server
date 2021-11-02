import mongoose, { Schema } from 'mongoose';
import IQueue from './_interface';

const QueueSchema: Schema = new Schema(
    {
        queueId: {
            type: String
        },
        status: {
            type: Boolean
        },
        numOfStations: {
            type: Number
        },
        name: {
            type: String
        },
        admin: [{ type: String }]
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IQueue>('Queue', QueueSchema);