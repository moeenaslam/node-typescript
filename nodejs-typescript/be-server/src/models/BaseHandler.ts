import {IncomingMessage, ServerResponse} from "http";
import {HttpCodes} from "./HttpModel";

export abstract class BaseHandler {
    protected req: IncomingMessage;
    protected res: ServerResponse;

    public constructor(req: IncomingMessage,
                       res: ServerResponse
    ) {
        this.req = req;
        this.res = res;
    }

    protected async handleMethodNotAllowed(){
        this.res.statusCode = HttpCodes.METHOD_NOT_ALLOWED;
        this.res.write('Method not allowed');
    }
    protected async handleNotFound(){
        this.res.statusCode = HttpCodes.NOT_FOUND;
        this.res.write('resource not found');
    }

    protected respondJsonBody(body: any, statusCode: HttpCodes): void {
        this.res.statusCode = statusCode;
        this.res.writeHead(statusCode, {'Content-Type':'application/json'});
        this.res.write(JSON.stringify(body));
    }
    protected respondBadRequest(message: string): void {
        this.res.statusCode = HttpCodes.BAD_REQUEST;
        this.res.writeHead(HttpCodes.BAD_REQUEST, {'Content-Type':'application/json'});
        this.res.write(message);
    }
    protected respondNotAuthorized(): void {
        this.res.statusCode = HttpCodes.UNAUTHORIZED;
        this.res.write('Unauthorized to access');
    }
    protected respondText(message: string, httpCode: HttpCodes): void {
        this.res.statusCode = httpCode;
        this.res.write(message);
    }

    abstract handleRequest(): Promise<void>


    protected async getRequest(): Promise<any>{
        return new Promise((resolve, reject)=>{
            let body = '';
            this.req.on('data', (data: string)=>{
                body+=data;
            });
            this.req.on('end',()=>{
                try{
                    resolve(JSON.parse(body));
                }catch (error){
                    reject(error);
                }
            });
            this.req.on('error', (error: any)=>{
                reject(error);
            })
        });
    }
}