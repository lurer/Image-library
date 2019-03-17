import { BodyParser, RequestBody } from "@loopback/rest";
import multer = require("multer");

const FORM_DATA = 'multipart/form-data';


/**
 * Custom body parser for parsing multipart/form-data.
 * multer package is used to transform the request into our chosen format that will be recieved in the controller.
 */
export default class MultipartFormDataBodyParser implements BodyParser {

    name = FORM_DATA;
    
    supports(mediaType: string): boolean {
        // The mediaType can be
        // `multipart/form-data; boundary=--------------------------979177593423179356726653`
        return mediaType.startsWith(FORM_DATA);
    }
    async parse(request: any): Promise<RequestBody> {
        const storage = multer.memoryStorage();
        const upload = multer({ storage });
        return new Promise((resolve, reject) => {
            // tslint:disable-next-line:no-any
            upload.any()(request, ({} as any), (err) => {
                if (err)
                    reject(err);
                else {
                    resolve({
                        value: {
                            files: request.files,
                            // tslint:disable-next-line:no-any
                            fields: request.fields,
                        },
                    });
                }
            });
        });
    }
}