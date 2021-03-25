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
|__src 
    |__api # all files related to apis
        |__models # directory for models
        |__controllers # directory for controllers 
            |__getAllBuildings # example of controller.
        |__routes # directory for routes
            |__/buildings # example route
        |__services # directory for services
            |__calculateExpectedUsage # example of service
    |__ ....# other files not api-related
    |__index.ts # main file
|__test # test directory for additional tests



````
The project structure is organized by type and not feature. This is because of the relative small size of this project.

```models/```contains all mongoose models. 
```controllers/``` generates outputs. There should not be any calculations or other logic here. One controller can be used by several routes.  
```services/``` contains all logic. This should be kept separate from any routing and models. Available for all the backend. One services can be used by several controllers.  
```routes/``` all routing. This is what the frontend uses. 

Test files will be put together with the functionality they test, except for those testing a bigger part of the system.
These test files will be put in the ```test/``` folder. 

The databases are located in the ```database/`` folder in the root directory. 