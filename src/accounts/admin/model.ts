import mongoose, { Schema } from 'mongoose';
import IAdmin from './_interface';

const AdminSchema: Schema = new Schema(
    {
        adminId: {
            type: String
        },
        type: {
            type: String
        },
        status: {
            type: Boolean
        },
        fullName: {
            firstName: String,
            middleName: String,
            lastName: String,
            nameExtension : String
        },
        contact: {
            email: String
        },
        username: {
            type: String
        },
        password: {
            type: String
        },
        permissions: [{ type: Schema.Types.Mixed }],
        isArchived: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IAdmin>('Admin', AdminSchema);