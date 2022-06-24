

export function logInvocation(target: any, propertyKey: string, descriptor: PropertyDescriptor){
    const className = target.constructor.name;
    let originalMethod = descriptor.value;

    descriptor.value = async function(...args: any[]) {
        console.log(`${className}#${propertyKey} called with ${JSON.stringify(args)}`);
        const result = await originalMethod.apply(this,args);
        console.log(`${className}#${propertyKey} returned with ${JSON.stringify(result)}`);
        return result;
    }

}