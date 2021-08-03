import { Document } from 'mongoose';

export default interface IAdmin extends Document {
    adminId: String;
    roleId: String;
    username: String;
    email: String;
    password: String;
}