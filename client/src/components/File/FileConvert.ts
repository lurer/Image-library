import { FileObject } from "../../models/types";


export const ToFile = (obj: FileObject) : File => {
    let bs = atob(obj.data);
    let buffer = new ArrayBuffer(bs.length);
    let ba = new Uint8Array(buffer)
    for (var i = 0; i < bs.length; i++) {
        ba[i] = bs.charCodeAt(i);
    }
    let file = new File([ba], obj.fieldname, {
        type: obj.mimetype
    })
    return file;
}

export const FileToImage = (file: File) : HTMLImageElement => {
    let image = new Image();
    image.src = URL.createObjectURL(file);
    return image;
}

export const FileObjectToImage = (obj: FileObject) : HTMLImageElement => {
    const file = ToFile(obj);
    return FileToImage(file);
}