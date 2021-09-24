import mongoose, { Schema } from 'mongoose'
import IPool from './_interface'

const PoolSchema: Schema = new Schema(
    {
        poolId: {
            type: String
        },
        user: {
            type: String
        },
        queue: {
            type: String
        },
        station: {
            type: String
        },
        window: {
            type: String
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