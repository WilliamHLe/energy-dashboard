# TRDK02: Backend

Backend API for the Energy Dashboard. Utilizes MongoDB and HodDB for data storage and RDF schema queries.

# Environment

```
DB_HOST=                # URI of the database
DB_DATABASE=            # Name of the database
DB_USER=                # Login credentials for the database
DB_PASSWORD=            # Login credentials for the database

DB_CONNECTION_STRING=   # Alternative to the above credtionals to connect with a string instead

BRICK_HOST=             # URI of the brick service
BRICK_PORT=             # Port of the brick service
```

Environment variables are automatically set when running through docker.

# API documentation

See [API documentation](api-documentation/README.md) for instructions on the API.
# Project structure 

````
|__config # config files
|__src 
    |__api # all files related to apis
        |__models # directory for models
        |__controllers # directory for controllers 
            |__getAllBuildings # example of controller.
        |__routes # directory for routes
            |__/buildings # example route
        |__services # directory for services
            |__ ___tests___
            |__calculateExpectedUsage # example of service
    |__ types
    |__ util
    |__index.ts # main file

````
The project structure is organized by type and not feature. This is because of the relative small size of this project.

```api/models/```contains all mongoose models. 
```api/controllers/``` generates outputs. There should not be any calculations or other logic here. One controller can be used by several routes.  
```api/services/``` contains all logic. This should be kept separate from any routing and models. Available for all the backend. One services can be used by several controllers.  
```api/routes/``` all routing. This is what the frontend uses. 
```types/``` interfaces and types
```util``` utility functions (database setup etc.)

Test files will be put together with the functionality they test in `__test__` folders.
