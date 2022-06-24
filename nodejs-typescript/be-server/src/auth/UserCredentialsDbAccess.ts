import {UserCredential} from "../models/UserCredential";
import * as Nedb from 'nedb';

export class UserCredentialsDbAccess {

    private nedb: Nedb;

    constructor() {
        this.nedb = new Nedb('database/userCredentials.db');
        this.nedb.loadDatabase();
    }

    public async putUserCredentials(userCredentials: UserCredential): Promise<any>{
        return new Promise((resolve,reject)=>{
            // @ts-ignore
            this.nedb.insert(userCredentials, (err: Error, docs: any)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(docs);
                }
            });
        });
    }

    public async getUserCredentials(username: string, password: string): Promise<UserCredential | undefined>{
        return new Promise((resolve,reject)=>{
            this.nedb.find({username: username, password: password}, (err: Error, docs: any)=>{
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