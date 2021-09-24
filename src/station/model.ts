import mongoose, { Schema } from 'mongoose'
import IStation from './_interface'

const StationSchema: Schema = new Schema(
    {
        stationId: {
            type: String
        },
        status: {
            type: Boolean
        },
        stationNumber: {
            type: String
        },
        windows: [{ type: String }],
        name: {
            type: String
        },
        admin: [{ type: String }]
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IStation>('Station', StationSchema);