import { Document } from 'mongoose';

export default interface IFlashboard extends Document {
    flashboardId: String;
    type: String;
    status: Boolean;
    queueName: String;
    station: String;
    username: String;
    password: String;
}