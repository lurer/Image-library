import { BaseModel } from "../models/types";
import { Api } from './Api';
import Axios from "axios";

export class FileApi<T extends BaseModel|Blob> extends Api<T> {
    
    uploadFile = async (object: T) : Promise<T> => {
        const formData = new FormData();
        formData.append("file", object as Blob);
        const config = {
            headers:{
                "content-type": "multipart/form-data"
            }
        }
        const response = await Axios.post<T>(this.uri, formData, config);
        return response.data
        
    };
    
}