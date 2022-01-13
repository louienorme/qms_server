import mongoose, { Schema } from 'mongoose'
import IPool from './_interface'

const PoolSchema: Schema = new Schema(
    {
        poolId: {
            type: String
        },
        ticket: {
            type: Number
        },
        user: {
            type: String
        },
        queue: {
            type: String
        },
        station: {
            type: Number
        },
        window: {
            type: Number
        },
        status: {
            type: String
        },
        timeStarted: {
            type: String
        },
        timeEnded: {
            type: String
        }
    }
)

export default mongoose.model<IPool>('Pool', PoolSchema);