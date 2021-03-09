#! /bin/bash

BUILDINGS=buildings
readonly NAME
ETCURVES=etcurves
readonly ETCURVES
SENSORS=sensors
readonly SENSORS

# import building data
mongoimport --db $MONGO_INITDB_DATABASE \
            --username $DB_USERNAME --password $DB_PASSWORD \
            --type json \
            --collection $BUILDINGS \
            --file ../seed/$BUILDINGS.json --jsonArray

# import et curves
mongoimport --db $MONGO_INITDB_DATABASE \
            --username $DB_USERNAME --password $DB_PASSWORD \
            --type json \
            --collection $ETCURVES \
            --file ../seed/$ETCURVES.json --jsonArray

# import sensor and timeseries data
for filename in ../seed/sensors/*.json; 
do
    echo $filename
    mongoimport --db $MONGO_INITDB_DATABASE \
                --username $DB_USERNAME --password $DB_PASSWORD \
                --type json \
                --collection $SENSORS \
                --file $filename --jsonArray
done
