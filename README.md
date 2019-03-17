# Technical brief from Moment
This project uses Loopback 4 as an API framework to serve files through a REST API.
Loopback 4 is an extension on top of Express.js with a CLI to generate controllers and models etc.


## TODO
* Create "New file" component
* Implement Api methods like getAll etc.
* Verify that new React features are implemented correctly
* * React Hooks and Context.


## Run the project
For development: 
* Create a /client/.env file to specify port for webpack devServer. Like -> PORT=3001
* From root directory run: npm run start-dev

## Client
The client is an React app using React-Create-App.

## Server/Api
The api is the latest version of Loopback. Its a brand new implementation with breaking changes from v3.
It uses typescript natively and new javascript features like annotations and dependency injection to hook up models, repositories and datasources.
The Loopback 4 CLI is used to generate app scaffolding like datasources, models, repositories and controllers.

* Postgres PostgreSQL 10
* * Database settings
    ```json
    {
        "name": "filestore",
        "connector": "postgresql",
        "url": "",
        "host": "localhost",
        "port": 5432,
        "user": "postgres",
        "password": "",
        "database": "fileStorage"
    }
    ```
* * Persisted model in database. It is the interface for the generated model
```typescript
interface FileObject {
    fieldname: string;
    orgiginalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
    id: number;
}
```



