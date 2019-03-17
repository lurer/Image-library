import React, { Component, Suspense, lazy, ComponentType } from 'react';
import LoadingPage from './components/Loading/LoadingPage';
import { AppContextProvider } from './contexts/AppContext';
import { AppContextInterface } from './models/types';



const appContext: AppContextInterface = {
  serverEnv : {
    server: "localhost",
    apiEndpoint: "/",
    port: 3000
  }
}


const FileList = (
  lazy(() : Promise<{default:ComponentType}> => (
    import("./components/File/FileList")
  ))
)

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <AppContextProvider value={appContext}>
            <Suspense fallback={LoadingPage}>
              <FileList />
            </Suspense>
          </AppContextProvider>
        </header>
      </div>
    );
  }
}

export default App;
