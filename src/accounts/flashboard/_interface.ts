import { Document } from 'mongoose';

export default interface IFlashboard extends Document {
    flashboardId: String;
    station: String;
    username: String;
    password: String;
}