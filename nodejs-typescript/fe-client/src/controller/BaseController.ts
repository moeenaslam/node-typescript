import { Router } from "../Router";

export abstract class BaseController {
    protected container;
    protected router: Router;

    public constructor(router: Router){
        this.router = router;
        this.container = document.createElement("div");
    }

    public abstract createView(): HTMLDivElement;

    protected createElement<K extends keyof HTMLElementTagNameMap>(
        elementType: K, innerText?: string, action?: any
    ): HTMLElementTagNameMap[K]{

        const element = document.createElement(elementType);
        if(innerText){
            element.innerHTML = innerText;
        }
        if(action){
            element.onclick = action;
        }
        this.container.append(element);
        return element;
    }
}