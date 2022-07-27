import mongoose, { Schema } from 'mongoose';
import IUser from './_interface';

const UserSchema: Schema = new Schema(
    {
        userId: {
            type: String
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
        isArchived: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IUser>('User', UserSchema);