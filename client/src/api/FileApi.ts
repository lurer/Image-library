import { BaseModel } from "../models/types";
import { Api } from './Api';
import Axios from "axios";

export class FileApi<T extends BaseModel|Blob, U extends BaseModel> extends Api<T> {
    
    uploadFile = async (object: T) : Promise<U> => {
        const formData = new FormData();
        formData.append("file", object as Blob);
        const config = {
            headers:{
                "content-type": "multipart/form-data"
            }
        }
        const response = await Axios.post<U>(this.uri, formData, config);
        return response.data
        
    };
    
}