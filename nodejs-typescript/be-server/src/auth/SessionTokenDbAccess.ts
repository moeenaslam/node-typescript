import {UserCredential} from "../models/UserCredential";
import * as Nedb from 'nedb';
import {SessionToken} from "../models/SessionToken";
import {logInvocation} from "../shared/MethodDecorators";

export class SessionTokenDbAccess {

    private nedb: Nedb;

    constructor() {
        this.nedb = new Nedb('database/sessionTokens.db');
        this.nedb.loadDatabase();
    }

    @logInvocation
    public async storeSessionTokens(sessionToken: SessionToken): Promise<any>{
        return new Promise((resolve,reject)=>{
            // @ts-ignore
            this.nedb.insert(sessionToken, (err: Error, docs: any)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(docs);
                }
            });
        });
    }

    public async getSessionToken(tokenId: string): Promise<SessionToken | undefined>{
        return new Promise((resolve,reject)=>{
            this.nedb.find({tokenId: tokenId}, (err: Error, docs: any)=>{
                if(err){
                    reject(err);
                }
                else{
                    if(docs.length==0){
                        resolve(undefined);
                    }
                    else{
                        resolve(docs[0]);
                    }
                }
            });
        });
    }
}