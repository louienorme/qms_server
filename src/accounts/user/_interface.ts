import { Document } from 'mongoose';

export default interface IUser extends Document {
    userId: String;
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
}