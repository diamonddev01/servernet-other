function isObject(d: any) {
    return typeof d == "object" && d !== null;
}

// Using type<any> because TS Nightly is wack

export function flatten<T extends {}>(obj: any, keys?: Record<string, boolean>, def: boolean = true, fInclude: boolean = false): T | null {
    if(typeof obj !== "object") return null;
    let data: any;
    if(Array.isArray(obj)) {
        data = obj
    }
    else {
        data = Object.assign({}, obj) as T;
    }
    

    for(let [prop] of Object.entries(data)) {
        let include = keys?keys[prop]:def;
        console.log(include);
        if(!include) continue;
        const value = obj[prop];
        console.log(`${prop}: ${value}`);
        if(isObject(value)) data[prop] = flatten(value, keys, def, include);
    }

    return data as T;
}