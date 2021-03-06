import { BaseModel } from "../models/types";


export interface GenericApi<T extends BaseModel> {
    get: (id: string) => Promise<T>;
    getIds: () => Promise<Array<string>>;
    getAll: () => Promise<Array<T>>;
    create: (object: T) => Promise<T>;
    //find: () => Promise<T>;
    update: (id: string, toUpdate: T) => Promise<boolean>
    delete: (id: string) => Promise<boolean>;
    //count: () => Promise<number>

}