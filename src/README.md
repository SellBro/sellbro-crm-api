# Project structure

<br>

| File or folder    | Description                                                                                                                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/index.ts`    | The entry file. Here we define our app, attach routes, setup middlewares, initialize database connection.                                                                                                                   |
| `src/routes.ts`   | This is where we define all routes ( private / public ).                                                                                                                                                                    |                                                                                                                               |
| `src/controllers` | Controllers listen for client's requests and work with entities, database ( delete, update, create ) entities                                                                                                               |
| `src/db`          | Database related code and seeds go here.                                                                                                                                                                                    |
| `src/entities`    | This is where we define TypeORM entities, with all validations, relations, colums                                                                                                                                           |
| `src/errors`      | This is where we define custom errors and `catchErrors` function to `try/catch` errors easily .                                                                                                                             |
| `src/middleware`  | Middleware functions can modify request and response objects, end the request-response cycle, etc.                                                                                                                          |
| `src/utils`       | Utility(helper) functions that are used in multiple places across the codebase. For example `utils/constants.ts` or `utils/validations.ts` contains functions to validate entities before save.                             |
