import { BaseController } from "./BaseController";

export class MainController extends BaseController {

    public createView(): HTMLDivElement {

        const title = this.createElement("h2","Welcome to Main Page");

        const article = this.createElement("div",'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. ');

        const button = this.createElement("button", 'login', () => {
            this.router.switchToLogin();
        });

        // this.container.append(title,article,button);
        return this.container;
    }

  
}