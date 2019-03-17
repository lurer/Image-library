import { BaseModel } from "../models/types";


export interface GenericApi<T extends BaseModel> {
    get: (id: number) => Promise<T>;
    getAll: () => Promise<Array<T>>;
    create: (object: T) => Promise<T>;
    //find: () => Promise<T>;
    update: (toUpdate: T) => Promise<T>
    delete: (id: number) => Promise<number>;
    //count: () => Promise<number>

}