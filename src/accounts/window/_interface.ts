import { Document } from 'mongoose';

export default interface IWindowAccount extends Document {
    adminId: String;
    type: String;
    status: Number;
    queueName: String;
    station: Number;
    window: Number;
    username: String;
    password: String;
}

/** Status works differently for this interface
 *  0 - Inactive
 *  1 - Active / Idle
 *  2 - In Transaction
 */