import mongoose, { Schema } from 'mongoose';
import IPermission from './_interface';

const PermissionSchema: Schema = new Schema (
    {
        permissionId: {
            type: String
        },
        tag: {
            type: String
        },
        name: {
            type: String
        },
        description: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IPermission>('Permission', PermissionSchema);