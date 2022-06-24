import {AccessRight, SessionToken} from "../models/AuthModel";
import {BaseController} from "./BaseController";
import {DataService} from "../services/DataService";
import {User} from "../models/DataModels";

export class DashboardController extends BaseController{

    private sessionToken: SessionToken | undefined;

    private searchArea: HTMLInputElement | undefined;
    private resultArea: HTMLDivElement | undefined;
    private dataService: DataService = new DataService();

    private selectedUser: User | undefined;
    private selectedLabel: HTMLLabelElement | undefined;

    public setSessionToken(sessionToken: SessionToken): void {
        this.sessionToken = sessionToken;
    }

    public createView(): HTMLDivElement {
        this.createElement('h2','Dashboard');
        if(this.sessionToken){
            this.createElement('label', `welcome ${this.sessionToken.username}`);
            this.generateButtons();
        }
        else{
            this.createElement('label','Please go to public part of app');
        }

        return this.container;
    }

    private generateButtons(): void {
        if(this.sessionToken){
            this.createElement('br');
            for (const access of this.sessionToken.accessRights){
                this.createElement('button', AccessRight[access], async()=>{
                    await this.triggerAction(access);
                });
            }

            if(this.sessionToken.accessRights.includes(AccessRight.READ)){
                this.createElement('br');
                this.createElement('label','search');
                this.searchArea = this.createElement('input');
                this.resultArea = this.createElement('div');
            }
        }
    }


    private async triggerAction(access: AccessRight){

        switch (access) {
            case AccessRight.READ:
                const users = await this.dataService.getUsers(this.sessionToken!.tokenId,this.searchArea!.value);
                for(const user of users){
                    const label = this.createElement('label', JSON.stringify(user));
                    label.onclick = () => {
                        label.classList.toggle('selectedLabel');
                        this.selectedUser = user;
                        this.selectedLabel = label;
                    }
                    this.searchArea!.append(label);
                }
                break;
            case AccessRight.DELETE:
                if (this.selectedUser) {
                    await this.dataService.deleteUser(
                        this.sessionToken!.tokenId,
                        this.selectedUser
                    )
                    this.selectedLabel!.innerHTML = ''
                }
                break;

            default:
                break;
        }
    }
}