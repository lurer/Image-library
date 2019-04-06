import React, { Component, Suspense, lazy, ComponentType, createContext } from 'react';
import LoadingPage from './components/Loading/LoadingPage';
import { AppContextProvider } from './contexts/AppContext';
import { AppContextInterface } from './models/types';
import FileWrapper from './components/File/FileWrapper';
import * as types from './models/types';
import styles from './app.module.scss';

const appContext: AppContextInterface = {
  serverEnv: {
    server: "http://localhost",
    apiEndpoint: "/",
    port: 3000
  }
}

const FileList = (
  lazy((): Promise<{ default: ComponentType }> => (
    import("./components/File/FileList")
  ))
)

const NewFile = (
  lazy((): Promise<{ default: ComponentType }> => (
    import("./components/File/NewFile")
  ))
)

class App extends Component {

  render() {
    return (
      <div className={styles.app}>
        <header className={styles.appHeader}>

        </header>
        <div className={styles.content}>
          <AppContextProvider value={appContext}>
            <Suspense fallback={<LoadingPage />}>
              <FileWrapper>
                <NewFile />
                <FileList />

              </FileWrapper>
            </Suspense>
          </AppContextProvider>
        </div>

      </div>
    );
  }
}

export default App;
