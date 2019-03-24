import React, { SyntheticEvent, useEffect, useState, useContext } from 'react';
import { AppContextConsumer, AppContext } from '../../contexts/AppContext';
import styles from './newFile.module.scss';
import { FileApi } from '../../api/FileApi';




const NewFile = () => {

    const endpoint = "files";
    const context = useContext(AppContext);
    const api = new FileApi<File>(context.serverEnv, endpoint);


    
    
    const prepareSend = async (file: File) => {
        await api.uploadFile(file)
    }
    
    const fileOnChange = (files: FileList|null) => {
        if(files != null && files.length > 0){
            Array.from(files).forEach(file => prepareSend(file))
        }
    }

    return(
        <AppContextConsumer>
            {appContext => appContext &&
                <div>
                    <label htmlFor="fileUpload">
                        <input id="fileUpload" type="file" onChange={(e) => fileOnChange(e.target.files)} multiple></input>
                    </label>
                    
                </div>
            }
            
        </AppContextConsumer>
    )
}

export default NewFile;
