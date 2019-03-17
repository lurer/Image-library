import React, { Component } from 'react';
import { AppContextInterface } from '../models/types';



export const AppContext = React.createContext<AppContextInterface>({} as AppContextInterface)
export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;
