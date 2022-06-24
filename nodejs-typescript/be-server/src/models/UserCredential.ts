import {AuthAccount} from "./AuthAccount";

export enum AccessRight {
    CREATE,
    READ,
    UPDATE,
    DELETE
}

export interface UserCredential extends AuthAccount {
    accessRight: AccessRight[];
}