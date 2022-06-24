import {MainController} from "./controller/MainController";
import {LoginController} from "./controller/LoginController";
import { SessionToken } from "./models/AuthModel";
import { DashboardController } from "./controller/DashboardController";

export class Router{
    private mainContainer = document.getElementById('main-container');

    public handleRequest(){
        console.log(this.getRoute());
        switch (this.getRoute()) {
            case  '/login':
                this.switchToLogin();
                break;

            case '/dashboard':
                    this.switchToDashboard(undefined);
                    break;
            default:
                this.switchToMain();
                break;
        }
    }

    private getRoute() :string{
        return window.location.pathname;
    }
    

    public switchToLogin(): void {
        if(this.mainContainer){
            this.mainContainer.innerHTML = '';
            const loginController: LoginController = new LoginController(this);
            this.mainContainer.append(loginController.createView());
        }
    }

    public switchToMain(): void {
        if(this.mainContainer){
            this.mainContainer.innerHTML = '';
            const mainController: MainController = new  MainController(this);
            this.mainContainer.append(mainController.createView());
        }
    }

    public switchToDashboard(sessionToken: SessionToken | undefined): void {
    
        if(this.mainContainer){
            this.mainContainer.innerHTML = '';
            const dashboardController: DashboardController = new  DashboardController(this);
            if(sessionToken){
                dashboardController.setSessionToken(sessionToken);
            }
            this.mainContainer.append(dashboardController.createView());
        }
    }
}