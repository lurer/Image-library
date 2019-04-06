import React, { useContext } from 'react';
import styles from './fileTopWrapper.module.scss';

const FileTopWrapper = (props: any) => {


    return (
        <div className={styles.fileTopWrapper}>
            {props.children}
        </div>
    )
}

export default FileTopWrapper;
