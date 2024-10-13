import { IUserPayload } from "./user-payload.interface";

export interface IUserRequest extends Request{
    user: IUserPayload
}