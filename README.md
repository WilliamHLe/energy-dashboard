# TRDK02: Interactive Energy Dashboard

## Quickstart

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)
- [Python](https://www.python.org/downloads/)

### Local development

1. Navigate to the root project directory
1. Configure the environment variables
   1. Copy and rename `.env.example` to `.env`
   1. Change the variable values inside `.env`
1. Generate seed data by following instructions in [tools README](tools/README.md)
1. Start Docker
1. Start the application with `docker-compose up`

>If you already completed the setup process, run `docker-compose up --build` to start the application anytime

### Possible problems during installation
- If you run Windows be sure to set line separator settings to LF (Windows), especially for the files `init-mongo.sh` and `seed-mongo.sh`
- If you need to delete the Docker volume:
1. Run `docker-compose down`
2. Run `docker volume ls` and copy the name of the volume you want to delete
3. Run `docker volume rm <name of the volume>`

