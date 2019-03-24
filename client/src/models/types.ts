

export interface AppContextInterface {
    serverEnv: AppContextServer
}

export interface AppContextServer {
    server: string;
    apiEndpoint: string;
    port: number;
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