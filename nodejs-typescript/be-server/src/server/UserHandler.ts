import {IncomingMessage, ServerResponse} from "http";
import {UserDbAccess} from "../auth/dbAccessor/UserDbAccess";
import {HttpCodes, HttpMethods} from "../models/HttpModel";
import {Utils} from "./Utils";
import {BaseHandler} from "../models/BaseHandler";
import {TokenValidator} from "../models/TokenValidator";
import {AccessRight} from "../models/UserCredential";
import {User} from "../models/User";
import {countInstances} from "../shared/ObjectCounter";

@countInstances
export class UserHandler extends BaseHandler{


    private userDb: UserDbAccess;

    private tokenValidator: TokenValidator;

    public constructor(req: IncomingMessage,
                       res: ServerResponse,
                       tokenValidator: TokenValidator
    ) {
        super(req,res);
        this.userDb = new UserDbAccess();
        this.tokenValidator = tokenValidator;
    }

    async handleRequest(): Promise<void> {
        switch (this.req.method) {
            case HttpMethods.GET:
                await this.handleGet()
                break;
            case HttpMethods.PUT:
                await this.handlePut();
                break;
            case HttpMethods.DELETE:
                await this.handleDelete();
                break;
            case HttpMethods.OPTIONS:
                this.res.statusCode = HttpCodes.OK;
                break;
            default:
                await this.handleMethodNotAllowed();
                break;

        }
    }

    private async handlePut(){
        const userAccess = await this.operationAuthorized(AccessRight.CREATE);
        if(!userAccess){
            this.respondNotAuthorized();
            return;
        }
        const user: User = await this.getRequest();
        await this.userDb.putUser(user);
        this.respondText(`Successfully created user ${user.name}`, HttpCodes.CREATED);
    }

    private async handleGet(){
        const userAccess = await this.operationAuthorized(AccessRight.READ);
         if(!userAccess){
             this.respondNotAuthorized();
             return;
         }
        const parsedUrl = Utils.getUrlParameters(this.req.url);
        const userId = parsedUrl?.query?.id
        if(userId){
            const user = await this.userDb.getUser(userId as string);
            if(user){
                this.respondJsonBody(user,HttpCodes.OK);
            }
            else{
               await  this.handleNotFound();
            }
        }
        else if(parsedUrl?.query?.name){
            const userList: User[] = await this.userDb.getUserByName(parsedUrl?.query?.name as string);
            this.respondJsonBody(userList,HttpCodes.OK);
        }
        else{
            this.respondBadRequest('invalid id');
        }
    }


    private async handleDelete(){
        const userAccess = await this.operationAuthorized(AccessRight.DELETE);
        if(!userAccess){
            this.respondNotAuthorized();
            return;
        }
        const parsedUrl = Utils.getUrlParameters(this.req.url);
        const userId = parsedUrl?.query?.id
        if(userId){
            const result = await this.userDb.deleteUser(userId as string);
            if(result){
                this.respondText('deleted user',HttpCodes.OK);
            }
            else{
                await  this.respondText('failed to delete user', HttpCodes.NOT_FOUND);
            }
        }
        else{
            this.respondBadRequest('invalid id');
        }
    }


    public async operationAuthorized(operation: AccessRight): Promise<boolean>{
        const token = this.req.headers.authorization;
        if(token){
            const tokenRights = await this.tokenValidator.validateToken(token);
            if(tokenRights?.accessRights.includes(operation)){
                return true;
            }
        }
        return false;
    }
}