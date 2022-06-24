import {TokenGenerator} from "../models/TokenGenerator";
import {AuthAccount} from "../models/AuthAccount";
import {SessionToken} from "../models/SessionToken";
import {UserCredentialsDbAccess} from "./UserCredentialsDbAccess";
import {SessionTokenDbAccess} from "./SessionTokenDbAccess";
import {TokenRight, TokenState, TokenValidator} from "../models/TokenValidator";
import {countInstances} from "../shared/ObjectCounter";
import {logInvocation} from "../shared/MethodDecorators";

@countInstances
export class Authorizer implements TokenGenerator, TokenValidator{

    private userDb: UserCredentialsDbAccess = new UserCredentialsDbAccess();
    private sessionDb: SessionTokenDbAccess = new SessionTokenDbAccess();
    @logInvocation
    async generateToken(user: AuthAccount): Promise<SessionToken | undefined> {

        let result = await this.userDb.getUserCredentials(user.username,user.password);
        if(result){
            const token: SessionToken = {
                accessRights: result.accessRight,
                expirationTime: this.generateExpirationTime(),
                username: result.username,
                valid: true,
                tokenId: this.generateRandomToken(),
            }
            await  this.sessionDb.storeSessionTokens(token);
            return token;
        }
        else{
            return undefined;
        }
    }



    private generateExpirationTime(): Date {
        return new Date(Date.now()+ (60*60*60));
    }


    private generateRandomToken(): string {
        return Math.random().toString(36).slice(2);
    }

   public async validateToken(tokenId: string): Promise<TokenRight | undefined> {
        const token = await this.sessionDb.getSessionToken(tokenId);
        if(!token || !token.valid){
            return {
                accessRights: [],
                state: TokenState.INVALID
            }
        }
        else if(token && token.expirationTime < new Date()){
            return {
                accessRights:[],
                state: TokenState.EXPIRED
            }
        }
        return {
            accessRights: token.accessRights,
            state: TokenState.VALID
        }
    }
}