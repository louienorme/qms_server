import { Document } from "mongoose";

export default interface IPermission extends Document {
    permissionId: String;
    tag: String;
    name: String;
    description: String;
}