import {AuthAccount} from "./AuthAccount";
import {SessionToken} from "./SessionToken";
import {AccessRight} from "./UserCredential";

export interface TokenValidator {
    validateToken(tokenId: string): Promise<TokenRight | undefined>;
}


export  interface TokenRight {
    accessRights: AccessRight[],
    state: TokenState,
}

export enum TokenState {
    VALID,
    INVALID,
    EXPIRED
}