import React, { useState, useEffect, useContext, Fragment } from 'react';
import { AppContextConsumer, AppContext } from '../../contexts/AppContext';
import { FileObject } from '../../models/types';
import axios from 'axios';

import styles from './fileList.module.scss';
import { FileApi } from '../../api/FileApi';


const FileList = () => {
    
    const endpoint = "files";
    const [data, setData] = useState<Array<FileObject>>( [] );
    const context = useContext(AppContext);
    const api = new FileApi<FileObject>(context.serverEnv, endpoint)

    useEffect(() => {
        const fetchApi = async () => {
            const result = await api.getAll()
            setData(result)
        }
        fetchApi();
    })

    return(
        <Fragment>
            {data && data.map((file) => {

            })}
        </Fragment>

    )
    
}

export default FileList;

