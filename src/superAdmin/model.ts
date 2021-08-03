import mongoose, { Schema } from 'mongoose';
import IAdmin from './_interface';

const AdminSchema: Schema = new Schema(
    {
        adminId: {
            type: String
        },
        roleId: {
            type: String
        },
        username: {
            type: String
        },
        email: { 
            type: String
        },
        password: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IAdmin>('Admin', AdminSchema);