import mongoose, { Schema } from 'mongoose';
import IBranch from './_interface';

const BranchSchema: Schema = new Schema(
    {
        branchId: {
            type: String
        },
        status: {
            type: Boolean
        },
        queues : [{ type: String }],
        name: {
            type: String
        },
        admin: [{ type: String }]
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IBranch>('Branch', BranchSchema);