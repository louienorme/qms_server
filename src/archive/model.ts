import mongoose, { Schema } from 'mongoose'
import IArchive from './_interface'

const ArchiveSchema: Schema = new Schema(
    {
        archiveId: {
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
        user: {
            type: String
        },
        action: {
            type: String
        },
        timeStarted: {
            type: String
        },
        timeEnded: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IArchive>('Archive', ArchiveSchema);