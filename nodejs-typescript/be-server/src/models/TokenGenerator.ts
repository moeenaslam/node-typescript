import {AuthAccount} from "./AuthAccount";
import {SessionToken} from "./SessionToken";

export interface TokenGenerator {
    generateToken(user: AuthAccount): Promise<SessionToken | undefined>;
}
