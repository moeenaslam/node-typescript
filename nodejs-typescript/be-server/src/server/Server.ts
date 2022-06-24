import {createServer, IncomingMessage, ServerResponse} from 'http';
import {Utils} from "./Utils";
import {LoginHandler} from "./LoginHandler";
import {Authorizer} from "../auth/Authorizer";
import {UserHandler} from "./UserHandler";
import {Monitor} from "../shared/ObjectCounter";


export class Server {

    private authorizer: Authorizer = new Authorizer();

    public createServer(){
        createServer(async (req: IncomingMessage, res: ServerResponse) => {
            this.addCorsHeaders(res);
            const basePath = Utils.getUrlBasePath(req.url);
            switch (basePath) {
                case 'systemInfo':
                    res.write(Monitor.printInstances());
                    break;
                case 'login':
                    await new LoginHandler(req, res, this.authorizer).handleRequest();
                    break;
                case 'users':
                    await new UserHandler(req,res, this.authorizer).handleRequest();

            }
            res.end();
        }).listen(8080);
    }

    private addCorsHeaders(res: ServerResponse): void {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.setHeader('Access-Control-Allow-Methods', '*');
    }
}