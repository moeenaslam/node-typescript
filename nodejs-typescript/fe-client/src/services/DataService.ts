import {User} from "../models/DataModels";

const baseUrl = 'http://localhost:8080/';
const userUrl = baseUrl + 'users';

export class DataService {

    public async getUsers(authToken: string, name: string): Promise<User[]>{
        const url = userUrl + '?name='+name;
        let options = {
            method: 'GET',
            headers: {
                'Authorization':authToken,
            },
        }
        console.log(options);

        const result = await fetch(url,options);
        return await result.json();


    }

    public async createUser(body: any): Promise<User | undefined>{

        let options = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(body)
        }

        const result = await fetch(userUrl,options);
        if(result.status==201){
            return await result.json();
        }
        else{
            return undefined;
        }

    }

    public async deleteUser(authorization: string, user: User): Promise<void> {
        const url = userUrl + '?id=' + user.id;
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: authorization
            }
        }
        await fetch(url, options);
    }
}