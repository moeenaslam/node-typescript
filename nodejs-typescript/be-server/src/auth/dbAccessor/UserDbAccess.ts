import * as Nedb from "nedb";
import {SessionToken} from "../../models/SessionToken";
import {UserCredential} from "../../models/UserCredential";
import {User} from "../../models/User";

export class UserDbAccess {
    private nedb: Nedb;

    constructor() {
        this.nedb = new Nedb('database/userDb.db');
        this.nedb.loadDatabase();
    }

    public async putUser(user: User): Promise<any>{
        return new Promise((resolve,reject)=>{
            // @ts-ignore
            this.nedb.insert(user, (err: Error, docs: any)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(docs);
                }
            });
        });
    }

    public async getUser(id: string): Promise<User | undefined>{
        return new Promise((resolve,reject)=>{
            this.nedb.find({id: id}, (err: Error, docs: any)=>{
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

    public async getUserByName(name: string): Promise<User[]>{
        const regEx = new RegExp(name);
        return new Promise((resolve,reject)=>{
            this.nedb.find({name: regEx}, (err: Error, docs: any)=>{
                if(err){
                    reject(err);
                }
                else{
                   resolve(docs);
                }
            });
        });
    }


    public async deleteUser(id: string): Promise<boolean>{
        const opSuccess = await this.deleteUserById(id);
        this.nedb.loadDatabase();
        return opSuccess;
    }

    private async deleteUserById(id: string): Promise<boolean>{
        return new Promise((resolve,reject)=>{
            // @ts-ignore
            this.nedb.remove({id: id}, (err: Error, numRemoved: number)=>{
                if(err){
                    reject(err);
                }
                else{
                    if(numRemoved){
                        resolve(false);
                    }
                    else{
                        resolve(true);
                    }
                }
            });
        });
    }

}