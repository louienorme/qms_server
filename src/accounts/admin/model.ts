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
        address: {
            type: String
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
        permissions: [{ type: Schema.Types.Mixed }]
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IAdmin>('Admin', AdminSchema);