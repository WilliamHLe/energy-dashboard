# TRDK02: Interactive Energy Dashboard

## Quickstart

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)
- [Nodejs](https://nodejs.org/en/) version 12 or greater
- [Highcharts](https://www.highcharts.com/) License
- [Python](https://www.python.org/downloads/) (Only required for generating data)

### Setup:
1. Navigate to the root project directory
1. Configure the environment variables
   1. Copy and rename `.env.example` to `.env`
   1. Change the variable values inside `.env`
1. Install backend `cd backend && npm i`
1. Install frontend `cd frontend && npm i`
1. Obtain Highcharts license and install Highcharts
```sh
$ cd frontend
$ npm i highcharts highcharts-more highcharts-react-official
```

### Running locally with Docker:
1. Start Docker
1. Start the application with `docker-compose up`

Where to access the application?
- Frontend is running on [localhost:80](http://localhost)
- Backend is running on [localhost:4000](http://localhost:4000/api-docs)

>If new packages are installed you may have to run `docker-compose up --build`
### Running locally without Docker:
This requires feeding the applications their environment variables or it will run without a database/api connection.

1. Start frontend `cd frontend && npm start`
1. Start backend `cd backend && npm run dev`

### Possible problems during installation
- If you run Windows be sure to set line separator settings to LF (Windows), especially for the files `init-mongo.sh` and `seed-mongo.sh`
- If you need to delete the Docker volume:
1. Run `docker-compose down`
2. Run `docker volume ls` and copy the name of the volume you want to delete
3. Run `docker volume rm <name of the volume>`

## Tests
The project is set up with unit tests. These can be run with `npm run test` or `npm run test:watch` for both the frontend and backend application.

### License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

