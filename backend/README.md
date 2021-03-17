# TRDK02: Backend

Backend API for the Energy Dashboard. Utilizes MongoDB and HodDB for data storage and RDF schema queries.

# Environment

```
DB_PORT=            # Port of the database
DB_HOST=            # URI of the database
DB_DATABASE=        # Name of the database
DB_USER=            # Login credentials for the database
DB_PASSWORD=        # Login credentials for the database

BRICK_HOST=         # URI of the brick service
BRICK_PORT=         # Port of the brick service
```
# Project structure 

````
|__config # config files
|__node_modules 
|__src 
    |__api
    |__index.ts # main file
|__test # test directory for additional tests
|__package.json
|__package-lock.json 


````

Test files will be put together with the functionality they test, except for those testing a bigger part of the system.
These test files will be put in the test folder. 

The databases are located in the database folder in the root directory. 