import React, { useState, useReducer } from 'react';
import { FileObject } from '../../models/types';
import { FileContextProvider } from '../../contexts/FileContext';
import styles from './fileWrapper.module.scss';

const FileWrapper = (props: any) => {

    const [files, setFiles] = useState<Array<FileObject>>([]);
    const addFiles = (fileList: Array<FileObject>) => {
        fileList.map(f=> setFiles(files => [...files, f]))
    }

    const deleteFile = (id: string) => {
        setFiles(files.filter((f: FileObject, idx: number) => f._id != id))
    }

    const endpoint = "files";
    

    return (
        <div className={styles.fileWrapper}>
            <FileContextProvider value={{ files: files, addFiles: addFiles, endpoint: endpoint, deleteFile:deleteFile }}>
                {props.children}
            </FileContextProvider>
        </div>
    )

}

export default FileWrapper;

