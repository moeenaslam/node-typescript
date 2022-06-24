import {IncomingMessage, ServerResponse} from "http";
import {AuthAccount} from "../models/AuthAccount";
import {TokenGenerator} from "../models/TokenGenerator";
import {HttpCodes, HttpMethods} from "../models/HttpModel";
import {BaseHandler} from "../models/BaseHandler";
import {AccessRight} from "../models/UserCredential";
import {countInstances} from "../shared/ObjectCounter";

@countInstances
export class LoginHandler extends BaseHandler{
    private tokenGenerator: TokenGenerator

    public constructor(req: IncomingMessage,
                       res: ServerResponse,
                       tokenGenerator: TokenGenerator
                       ) {
        super(req,res);
        this.tokenGenerator = tokenGenerator;
    }

    public async handleRequest(): Promise<void> {
          switch (this.req.method) {
              case HttpMethods.POST:
                  await this.handlePostRequest();
                  break;
              case HttpMethods.OPTIONS:
                  this.res.statusCode = HttpCodes.OK;
                  break;
              default:
                  await this.handleMethodNotAllowed();
                  break;
          }

    }

    private async handlePostRequest() {
        try{
            const body = await this.getRequest();
            console.log(body);
            const sessionToken = await this.tokenGenerator.generateToken(body);
            console.log(sessionToken);
            if(sessionToken){
                this.respondJsonBody(sessionToken, HttpCodes.CREATED);
            }
            else{
                this.res.statusCode = HttpCodes.NOT_FOUND
                this.res.write('invalid credentials');
            }
        }catch (error: any) {
            this.res.write('error: '+error.message);
        }
    }

}