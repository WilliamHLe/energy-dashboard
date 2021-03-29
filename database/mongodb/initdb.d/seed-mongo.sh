#! /bin/bash

BUILDINGS=buildings
readonly BUILDINGS
CATEGORIES=categories
readonly CATEGORIES
ETCURVES=etcurves
readonly ETCURVES
SENSORS=sensors
readonly SENSORS

# import building data
mongoimport --db $MONGO_INITDB_DATABASE \
            --username $DB_USERNAME --password $DB_PASSWORD \
            --type json \
            --collection $BUILDINGS \
            --file ../seed/$BUILDINGS.json --jsonArray \
            --quiet

# import building category data
mongoimport --db $MONGO_INITDB_DATABASE \
            --username $DB_USERNAME --password $DB_PASSWORD \
            --type json \
            --collection $CATEGORIES \
            --file ../seed/$CATEGORIES.json --jsonArray \
            --quiet

# import et curves
mongoimport --db $MONGO_INITDB_DATABASE \
            --username $DB_USERNAME --password $DB_PASSWORD \
            --type json \
            --collection $ETCURVES \
            --file ../seed/$ETCURVES.json --jsonArray \
            --quiet

# import sensor and timeseries data
for filename in ../seed/sensors/*.json; 
do
    echo $filename
    mongoimport --db $MONGO_INITDB_DATABASE \
                --username $DB_USERNAME --password $DB_PASSWORD \
                --type json \
                --collection $SENSORS \
                --file $filename --jsonArray \
                --quiet
done
