import React, { useContext } from 'react';
import { AppContextConsumer, AppContext } from '../../contexts/AppContext';
import styles from './newFile.module.scss';
import { FileApi } from '../../api/FileApi';
import { FileObject } from '../../models/types';
import { FileContext } from '../../contexts/FileContext';


const NewFile = () => {

    const endpoint = "files";
    const context = useContext(AppContext);
    const {files, addFiles} = useContext(FileContext);
    const api = new FileApi<File, FileObject>(context.serverEnv, endpoint);


    const prepareSend = async (file: File) => {
        if(file.type.startsWith("image/")){
            const result = await api.uploadFile(file)
            addFiles([result])
        }
        
    }
    
    const fileOnChange = (files: FileList|null) => {
        if(files != null && files.length > 0){
            Array.from(files).forEach(file => prepareSend(file))
        }
    }

    return(
        <AppContextConsumer>
            {appContext => appContext &&
                <div className={styles.newFileContainer}>
                    <label htmlFor="fileUpload" className={styles.fileUploadLabel}>Last opp bilder
                        <input id="fileUpload" className={styles.fileUpload} type="file" multiple accept='image/*' onChange={(e) => fileOnChange(e.target.files)}></input>
                    </label>
                    
                </div>
            }
            
        </AppContextConsumer>
    )
}

export default NewFile;
