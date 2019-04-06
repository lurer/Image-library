import React, { Component } from 'react';
import { FileObject, FileContextInterface } from '../models/types';


export const FileContext = React.createContext<FileContextInterface>({} as FileContextInterface)
export const FileContextProvider = FileContext.Provider;
export const FileContextConsumer = FileContext.Consumer;
