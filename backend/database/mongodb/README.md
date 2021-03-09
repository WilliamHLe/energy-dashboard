# TRDK02: MongoDB

Initialization and configuration files for MongoDB.

## Environment

```
MONGO_INITDB_DATABASE=          # Database to create

MONGO_INITDB_ROOT_USERNAME=     # Root username
MONGO_INITDB_ROOT_PASSWORD=     # Root password

DB_USERNAME=                    # Non-root username
DB_PASSWORD=                    # Non-root password
```

## Setup

`./initdb.d/init-mongo.sh` is responsible for creating a database and a non-root user. This is the
database and user credentials used on the backend application.

## Configuration

`./mongod.conf` is the configuration of settings for the MongoDB instance. Here we can change different [options](https://docs.mongodb.com/manual/reference/configuration-options/).
