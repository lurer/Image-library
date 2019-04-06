import React, { useState, useEffect, useContext, Fragment } from 'react';
import { AppContextConsumer, AppContext } from '../../contexts/AppContext';
import { FileObject } from '../../models/types';

import styles from './fileList.module.scss';
import { FileApi } from '../../api/FileApi';
import { FileContext } from '../../contexts/FileContext';
import File from './File';


const FileList = () => {

    const appCtx = useContext(AppContext);
    const fileCtx = useContext(FileContext);
    const {files, addFiles: addFiles} = useContext(FileContext);
    const api = new FileApi<FileObject, FileObject>(appCtx.serverEnv, fileCtx.endpoint)

    useEffect(() => {
        const fetchApi = async () => {
            const result = await api.getAll()
            addFiles(result)
        }
        fetchApi();
    }, [])



    return (
        <div className={styles.fileList}>
            {files && files.map((file, index) => {
                return (
                    <File key={file._id} file={file}/>
                )
            })}
        </div>
    )

}

export default FileList;

