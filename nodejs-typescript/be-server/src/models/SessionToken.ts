import {AccessRight} from "./UserCredential";

export interface SessionToken {

    tokenId: string;
    username: string,
    valid: boolean,
    expirationTime: Date,
    accessRights: AccessRight[]
}