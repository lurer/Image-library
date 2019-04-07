import React, { Component, Suspense, lazy, ComponentType, createContext, useState } from 'react';
import LoadingPage from './components/Loading/LoadingPage';
import { AppContextProvider } from './contexts/AppContext';
import { AppContextInterface } from './models/types';
import FileWrapper from './components/File/FileWrapper';
import * as types from './models/types';
import styles from './app.module.scss';
import SortMethods from './components/File/SortMehtods';
import FileTopWrapper from './components/File/FileTopWrapper';
import StatusMessage from './components/StatusMessage/StatusMessage';






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

const App = () => {

  const [messages, setMessage] = useState<Array<types.StatusMessage>>([])

  const fireAlert = (message: types.StatusMessage) => {
    setMessage([...messages,message])
    setTimeout(() => {
      setMessage(messages.filter((m: types.StatusMessage) => m.title != message.message))
    }, message.type == "info" ? 1000 : 2000)
  }


  const appContext: AppContextInterface = {
    serverEnv: {
      server: "http://localhost",
      apiEndpoint: "/",
      port: 3000
    },
    alertMessage: fireAlert
  }

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
          {messages.map((message, index) => <StatusMessage {...message} key={index}/>)}
      </header>
      <div className={styles.content}>
        <AppContextProvider value={appContext}>
          <Suspense fallback={<LoadingPage />}>
            <FileWrapper>
              <FileTopWrapper>
                <NewFile />
                <SortMethods />
              </FileTopWrapper>
              <FileList />
            </FileWrapper>
          </Suspense>
        </AppContextProvider>
      </div>

    </div>
  );
}

export default App;
