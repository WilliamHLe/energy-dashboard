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
        |__sensors # directory for sensor-related files, may contain models, controllers etc
            |__sensors.model.ts # naming for files in sensor directory
            |__sensors.controller.ts # controller
            |__sensors.routes.ts # REST routing
            |__sesnors.logic # for calculations and other logic
        |__etcurves # directory for etcurves 
        |__buildings # directory for buildings
    |__ ....# other files not api-related
    |__index.ts # main file
|__test # test directory for additional tests



````
```sensors/``` is an example for how all other api-sub-directories can be structured. Logic-file includes all logic not contained in 
the controller. The controller should only deal with input/output logic. 

Test files will be put together with the functionality they test, except for those testing a bigger part of the system.
These test files will be put in the ```test/``` folder. 

The databases are located in the ```database/``` folder in the root directory. 