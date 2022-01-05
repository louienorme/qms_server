import { Document } from 'mongoose';

export default interface IAdmin extends Document {
    adminId: String;
    type: String;
    status: Boolean;
    fullName: {
        firstName: String;
        middleName: String;
        lastName: String;
        nameExtension : String;
    };
    contact: {
        email: String;
    };
    username: String;
    password: String;
    permissions: Array<any>;
}