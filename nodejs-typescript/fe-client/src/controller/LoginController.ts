import { LoginService } from "../services/LoginService";
import { BaseController } from "./BaseController";
import {LinkTextValue} from "../decorators/Decorators";

export class LoginController extends BaseController {

    private loginService: LoginService = new LoginService();


    private title = this.createElement("h2", "Login to your account");
    private usernameLabel = this.createElement('label','Username');
    private usernameInput = this.createElement('input');
    private br = this.createElement('br');
    private passwordLabel = this.createElement('label', 'Password');
    private passwordInput = this.createElement('input');
     private br2 = this.createElement('br');
    private errorLabel = this.createElement('label');
    @LinkTextValue('errorLabel')
    private errorLabelText: string = '';
    private br3 = this.createElement('br');
    private button = this.createElement("button",'login',
        async () => {
            if(this.usernameInput.value && this.passwordInput.value){
                this.errorLabelText = '';
                const result = await this.loginService.login(
                    this.usernameInput.value, this.passwordInput.value
                );
                if(result){
                    this.errorLabelText = '';
                    this.router.switchToDashboard(result);
                }
                else{
                    this.errorLabelText = 'Invalid credentials';
                }
            }
            else{
                this.errorLabelText = 'Please fill username and password';
            }
        }
        );

    public createView(): HTMLDivElement {
        this.errorLabel.id = 'errorLabel';
        this.passwordInput.type = 'password';
        this.errorLabel.style.color = 'red';

        
        return this.container;
    }

    // private showError(message: string): void {
    //     this.errorLabel.innerText = message;
    //     this.errorLabel.style.visibility = 'visible';
    // }
    //
    // private resetError(): void {
    //     this.errorLabel.innerText = '';
    //     this.errorLabel.style.visibility = 'hidden';
    // }
}