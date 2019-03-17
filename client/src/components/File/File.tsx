import React from 'react';
import { AppContextConsumer } from '../../contexts/AppContext';
import styles from './file.module.scss';

const File = () => (
    <AppContextConsumer>
        {appContext => appContext &&
            <div></div>
        }
        
    </AppContextConsumer>
)

export default File;
