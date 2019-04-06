import React, { useContext } from 'react';
import { AppContextConsumer, AppContext } from '../../contexts/AppContext';
import styles from './newFile.module.scss';
import { FileApi } from '../../api/FileApi';
import { FileObject } from '../../models/types';
import { FileContext } from '../../contexts/FileContext';


const NewFile = () => {

    const endpoint = "files";
    const appCtx = useContext(AppContext);
    const {files, addFiles} = useContext(FileContext);
    const api = new FileApi<File, FileObject>(appCtx.serverEnv, endpoint);


    const prepareSend = async (file: File) => {
        try{
            if(file.type.startsWith("image/")){
                const result = await api.uploadFile(file)
                addFiles([result])
            }
            appCtx.alertMessage({title: "Bildet/bildene er lagret", type:"info"})
        }catch(err){
            appCtx.alertMessage({title: "Bildet kunne ikke lagres", type:"error"})
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
