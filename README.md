# Simple image site for uploading and viewing images.
This project uses Loopback 4 as an API framework to serve files through a REST API.
Loopback 4 is an extension on top of Express.js with a CLI to generate controllers and models etc.

The main goal with this implementation has been to learn the new features of React and Loopback, both of which I want to use in my own projects. this is not a complete project for handling images. Just selected features to play with new technology.

The use of external libraries for UI components and features has been minimal.


## Prerequisites
* MongoDb running on local macine.
* Node v10 or higher. Not tested with anything else.
* Clone the project, and from the root folder run `npm install`.

## Run the project
For development: 
* Create a /client/.env file to specify port for webpack devServer. Like -> PORT=3001
* From root directory run: npm run start-dev


## Client
The client is an React app using React-Create-App. React has lots of new features, and I have tried to use a few of them, to learn and improve.
### Context
I have two different Contexts in the app. 
`AppContext` provides the App environment, and future app specific settings. It is defined in `App.tsx` and wraps all components in the app.
Both `FileList` and `NewFile` components makes use to `AppContext` for retreiving the server api endpoint.

`FileApi` provides File specific props and methods. `FileContextProvider` in `FileWrapper` component implements `addFiles` and `deleteFile` methods using React `useState` Hook.

### Hooks
There are many hooks not used here, but two of the most common ones are. 
The `useEffect` Hook is used in `FileList.tsx` as a `componentDidMount` life cycle method. Once the component is done rendering the Hook will fetch files from the API and use the `addFiles` method from the `FileContext`.
The `useState` Hook is used several places and is the most common and simple Hook. It provides a variable prop and a set variable method. The key to using this Hook is that the set variable method has to manipulate the prop to trigger rerender. For instance the `deleteFile` method in `FileWrapper`. Here the operation within `setFiles` has to return the resulting array. A simple `files.splice(index, 1)` would not work.
```
    const deleteFile = (id: string) => {
        setFiles(files.filter((f: FileObject, idx: number) => f._id != id))
    }
```

## Server/Api
The api is the latest version of Loopback. Its a brand new implementation with breaking changes from v3.
It uses typescript natively and new javascript features like annotations and dependency injection to hook up models, repositories and datasources.
The Loopback 4 CLI is used to generate app scaffolding like datasources, models, repositories and controllers.

Much of the Loopback configuration in this project very close to what comes out of the box using the Loopback 4 CLI. Not all `FileController` methods are implemented for instance.

### Controller and Multipart parser
The Create method in the controller caused a bit trouble. I needed to find the best way to parse the request. After much googling I found a custom implementation that is much used in Express.js. It supports request with media type `FORM_DATA` and extracts the files from the request.



### MongoDB
MongoDB was used for convenience. PostgreSQL did not like the Buffer data type, and Loopback CLI could not create SQL columns with the correct type for the Buffer as well as for the autoincrement Id.

Database settings:

```json
{
    "name": "mongodb",
    "connector": "mongodb",
    "url": "",
    "host": "localhost",
    "port": 270017,
    "user": "",
    "password": "",
    "database": "fileStore"
}
```
Persisted model in database. It is the interface for the generated model. It has a NodeJs Buffer for the file data:

```typescript
interface FilePersisted {
    fieldname: string;
    orgiginalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
    created: Date;
    _id: string;
}
```
File view model. NodeJS Buffer data type does not work in front end libraries. The Front end Api receives a base64 encoded data instead:

```typescript
interface FileView {
    fieldname: string;
    orgiginalname: string;
    encoding: string;
    mimetype: string;
    buffer: string;
    size: number;
    created: Date;
    _id: string;
}
```


## Known limitations
There are a few limitations to the project.
* Error handling is basic. Wnated to use the `ErrorBoundry` solution from React together with `Axios` interceptors, but `ErrorBoundry` is not yet supported with funtional components.
* Could not get `getIds` method in `FileController` to work without getting all files in database and then filter out the ids. This makes page load with many images slower than it should be.
