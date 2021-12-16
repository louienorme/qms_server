import { Document } from 'mongoose';

export default interface IWindowAccount extends Document {
    adminId: String;
    status: Boolean;
    queueName: String;
    station: Number;
    window: Number;
    username: String;
    password: String;
}