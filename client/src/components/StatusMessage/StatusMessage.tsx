import React, { useContext } from 'react';
import { AppContextConsumer, AppContext } from '../../contexts/AppContext';
import styles from './statusMessage.module.scss';
import { StatusMessage as message } from '../../models/types';

const StatusMessage = (prop: message) => {
    return (
        <div className={styles.wrapper}>
            <div className={[styles.element, styles[prop.type]].join(" ")}>
                <p className={styles.title}>{prop.title}</p>
            </div>
        </div>
    )
}

export default StatusMessage;
