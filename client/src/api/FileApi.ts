import { BaseModel } from "../models/types";
import { Api } from './Api';

export class FileApi<T extends BaseModel> extends Api<T> {
    
    uploadFile = async (object: T) : Promise<T> => {
        return {} as any;
    };
    
}