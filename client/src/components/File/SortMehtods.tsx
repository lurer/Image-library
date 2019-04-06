import React, { useContext } from 'react';
import { AppContextConsumer, AppContext } from '../../contexts/AppContext';
import styles from './sortMethods.module.scss';
import { FileContext } from '../../contexts/FileContext';


const SortMethods = () => {

    const appCtx = useContext(AppContext);
    const { files, sortFiles } = useContext(FileContext);

    return (
        <div className={styles.sortWrapper}>
            <span>Sorter:</span>
            <span className={styles.sortWrapperInner}>
                <a href="javascript:void(0)" 
                    className={styles.sortLink} 
                    onClick={() => {sortFiles("fieldname"); appCtx.alertMessage({title: "Sortert stigende på navn", type:"info"})}}>Navn</a>
                <a href="javascript:void(0)" 
                    className={styles.sortLink} 
                    onClick={() => {sortFiles("size"); appCtx.alertMessage({title: "Sortert stigende på størrelse", type:"info"})}}>Størrelse</a>
            </span>
        </div>

    )
}

export default SortMethods;
