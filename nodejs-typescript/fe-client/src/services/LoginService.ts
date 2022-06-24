import { SessionToken } from "../models/AuthModel";

const baseUrl = 'http://localhost:8080/';
const loginUrl = baseUrl + 'login';

export class LoginService {

    public async login(username: string, password: string): Promise<SessionToken | undefined>{

        let options = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({username: username, password: password})
        }

        const result = await fetch(loginUrl,options);
        if(result.status==201){
            return await result.json();
        }
        else{
            return undefined;
        }

     }
}