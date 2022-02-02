import { Document } from 'mongoose';

export default interface IFlashboard extends Document {
    flashboardId: String;
    type: String;
    status: Boolean;
    queueName: String;
    station: number;
    username: String;
    password: String;
}