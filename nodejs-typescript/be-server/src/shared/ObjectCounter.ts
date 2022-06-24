
export class Monitor {

    public static printInstances(): string {
        let resp = '';
        Counter.objectsCount.forEach((val:number, key: string) => {
           resp = resp + `${key}: ${val}\n`;
        });
        return resp;
    }
}

class Counter {

    static objectsCount: Map<string, number> =new Map<string, number>();
    static increment(className: string){
        if(!this.objectsCount.has(className)){
           this.objectsCount.set(className,1);
        }
        else{
            const currValue = this.objectsCount.get(className);
            this.objectsCount.set(className,currValue!+1);
        }
    }
}

export function countInstances<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        abc = Counter.increment(constructor.name);
    }
}