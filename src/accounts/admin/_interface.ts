import { Document } from 'mongoose';

export default interface IAdmin extends Document {
    adminId: String;
    adminType: String;
    fullName: {
        firstName: String;
        middleName: String;
        lastName: String;
        nameExtension : String;
    };
    address: String;
    contact: {
        email: String;
    };
    username: String;
    password: String;
    permissions: Array<any>;
}