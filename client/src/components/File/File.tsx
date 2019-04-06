import React, { useRef, SyntheticEvent, useState, Fragment, useContext } from 'react';
import { AppContextConsumer, AppContext } from '../../contexts/AppContext';
import styles from './file.module.scss';
import { FileObject } from '../../models/types';
import { FileObjectToImage } from './FileConvert';
import { FileApi } from '../../api/FileApi';
import { FileContext } from '../../contexts/FileContext';

export interface FileProps {
    file: FileObject;
}



const File = (props: FileProps) => {

    const appCtx = useContext(AppContext);
    const fileCtx = useContext(FileContext);
    const [edit, setEdit] = useState(false);
    const [filename, setFileName] = useState(props.file.fieldname)

    const endpoint = "files";
    const api = new FileApi<FileObject, FileObject>(appCtx.serverEnv, fileCtx.endpoint)
    
    const sizeStr = (bytes: number): string => {
        if (bytes == 0) return '0 Bytes';
        var k = 1000,
            dm = 1,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { file } = props;
        setFileName(event.currentTarget.value)
        file.fieldname = event.currentTarget.value
    }

    const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        changeName();
    }

    const deleteImage = async () => {
        const { file } = props;
        const result = await api.delete(file._id).then((ok: boolean) => { setEdit(false); return ok;})
        if(result) fileCtx.deleteFile(file._id);
    }

    const changeName = async () => {
        const { file } = props;
        const result = await api.update(file._id, file).then((ok: boolean) => { setEdit(false); return ok;})
    }
    
    const onKeyDown = (event: any): void => {
        if (event.key === 'Enter') {
          event.preventDefault();
          event.stopPropagation();
          changeName();
          setEdit(false);
        }
      }

    const { file } = props
    let image = FileObjectToImage(file);

    return (<AppContextConsumer>
        {appContext => appContext &&
            <div className={styles.fileContainer}>
                <div className={styles.fileContent}>
                    <img src={image.src} height={200} alt="" className={styles.fileImage} />
                    <div className={styles.fileInfo}>
                        <p>
                            
                            {!edit ?
                                <Fragment>
                                    {filename}
                                    <span className={styles.buttonWrapper}>
                                        <button className={styles.btn} onClick={() => setEdit(true)}>Endre navn</button>
                                        <button className={styles.btn} onClick={() => deleteImage()}>Slett</button>    
                                    </span> 
                                    
                                </Fragment>
                            : 
                                <Fragment>
                                    <input type="text" className={styles.changeNameInput} value={file.fieldname} onChange={handleOnChange}  onKeyPress={onKeyDown} onBlur={handleOnBlur}/>
                                    <button className={[styles.btn, styles.btnConfirm].join(' ')} onClick={changeName}>OK</button>
                                </Fragment>
                                
                            }
                            
                            
                        </p>
                        <p>{new Date(file.created).toLocaleString()}</p>
                        <p>{sizeStr(file.size)}</p>
                    </div>

                </div>

            </div>
        }

    </AppContextConsumer>)
}

export default File;
