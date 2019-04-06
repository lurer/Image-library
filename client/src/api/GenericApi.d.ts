import { BaseModel } from "../models/types";


export interface GenericApi<T extends BaseModel> {
    get: (id: number) => Promise<T>;
    getAll: () => Promise<Array<T>>;
    create: (object: T) => Promise<T>;
    //find: () => Promise<T>;
    update: (id: string, toUpdate: T) => Promise<boolean>
    delete: (id: string) => Promise<boolean>;
    //count: () => Promise<number>

}