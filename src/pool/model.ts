import mongoose, { Schema } from 'mongoose'
import IPool from './_interface'

const PoolSchema: Schema = new Schema(
    {
        poolId: {
            type: String
        },
        order: {
            type: Number
        },
        ticket: {
            type: Number
        },
        user: {
            type: String
        },
        contact: {
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
        },
        createdBy: {
            type: String
        }
    }
)

export default mongoose.model<IPool>('Pool', PoolSchema);