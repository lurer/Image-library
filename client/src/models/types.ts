
export interface FileContextInterface{
    files:Array<FileObject>, 
    addFiles: (files:Array<FileObject>) => void
    deleteFile: (id: string) => void
    sortFiles: (id: string) => void
    endpoint: string;
}

export interface AppContextInterface {
    serverEnv: AppContextServer;
    alertMessage: (message: StatusMessage) => void;
}

export interface AppContextServer {
    server: string;
    apiEndpoint: string;
    port: number;
}

export interface StatusMessage {
    type: string;
    title: string;
    message?: string;
}

export interface BaseModel {

}

export interface FileObject extends BaseModel {
    fieldname: string;
    orgiginalname: string;
    encoding: string;
    mimetype: string;
    data: string;
    size: number;
    created: Date;
    _id: string;
}