from collections import defaultdict
import os
import json
import bson
import pathlib

SOURCE_DATA_PATH = './source_data'
OUT_DATA_PATH = './out'
OUT_DATA_PATH_SENSORS = f'{OUT_DATA_PATH}/sensors'

pathlib.Path(OUT_DATA_PATH_SENSORS).mkdir(parents=True, exist_ok=True) 

def load_esave_exports():
    """
    Loads the sensor timeseries data exported from ESave.

    Structure of the csv file:
    - First row is header with sensor ids
    - First column is date
    - Remaining columns are measurement for the given sensor id
    - Columns are separated by semicolon (;)
    """
    measurements = defaultdict(list)

    for part in range(1, 8):
        filename = f'ESaveExport_10121314_part{part}.csv'
        with open(f'{SOURCE_DATA_PATH}/{filename}', 'r') as f:
            sensor_names = f.readline().replace('\n', '').split(';')[1:]
            for line in f:
                clean_data = line.replace('\n', '').replace(',','.').split(';')
                date = clean_data.pop(0)
                daily_measurements = [{'date': date, 'measurement': float(measurement), 'i': i} for i, measurement in enumerate(clean_data) if measurement]

                # Problem: Some sensors have no data - we don't want empty or false measurements in the database. To still allow for
                # matching the measurement data on the column header the problem is dirty fixed by adding and removing an index on
                # the dict. Doesn't look pretty but it works! Should probably be done with a null check on measurement being empty string instead

                for daily_measurement in daily_measurements:
                    i = daily_measurement.pop('i', None)
                    measurements[sensor_names[i]].append(daily_measurement)

    return measurements

def load_sensors():
    """
    Loads the sensor metadata.

    Structure of the csv file:
    - First row is header (Object, name, measurement, id, uom, type)
    - Columns are separated by comma (,)
    - A row with object 'Bygg' indicates that the following rows are sensors
    for that building until the next instance of 'Bygg' is encountered
    """
    sensors = defaultdict(list)
    headers = ['object', 'description', 'measurement', 'name', 'unit_of_measurement', 'type']

    with open(f'{SOURCE_DATA_PATH}/Sensors.csv', 'r') as f:
        next(f)

        building = ''
        building_sensors = []

        for line in f:
            clean_data = line.replace('\n', '').replace('\xa0', '').split(',')
            
            d = dict(zip(headers, clean_data))
            object_type = d.pop(headers[0], None)

            if object_type == 'Bygg':
                if building and building_sensors:
                    sensors[building] = (building_sensors)

                building = d[headers[1]]
                building_sensors = []
                continue

            building_sensors.append(d)

    return sensors


def load_etcurves():
    """
    Loads the ETCurve data.

    Structure of the csv file:
    - First row is header (Building, FromDate, DX1, DX2, DX3, DX4, DX5, DX6, DY1, DY2, 
    DY3, DY4, DY5, DY6, ETXMin, ETXMax, ETYMin, ETXMax, Base load, ETColor, Description)
    - Columns are separated by TAB
    - Some values are stringified
    """
    etcurves = defaultdict(list)
    headers = ['building', 'from_date', 'dx1', 'dx2', 'dx3', 'dx4', 'dx5', 'dx6', 'dy1', 'dy2', 'dy3', 
    'dy4', 'dy5', 'dy6', 'etxmin', 'etxmax', 'etymin', 'etymax', 'base_load', 'etcolor', 'description']
    

    with open(f'{SOURCE_DATA_PATH}/ETCurves.csv', 'r') as f:
        next(f)

        for line in f:
            clean_data = line.replace('\n', '').replace('\xa0', '').split('\t')

            # parse values to float if possible
            offset = 2 
            for i, value in enumerate(clean_data[offset:-offset]):
                if value:
                    clean_data[i+offset] = float(value)
                else:
                    clean_data[i+offset] = None

            etcurve = dict(zip(headers, clean_data))
            building = etcurve.pop(headers[0], None)

            etcurves[building].append(etcurve)

    return etcurves

def generate_mongodb_objectid():
    """
    Generates an a Bson ObjectId similarly to how MongoDB generates
    their Ids. This ObjectId can then be used to create relations between
    objects.
    """
    return {
        "$oid": bson.objectid.ObjectId()
    }

def dump_to_json(filename, content, sensor=False):
    """
    Dumps content (Python Dict) to a readable json file for storage
    """
    base = os.path.basename(filename)
    path = OUT_DATA_PATH_SENSORS if sensor else OUT_DATA_PATH

    with open(f'{path}/{os.path.splitext(base)[0]}.json', 'w', encoding='utf8') as f:
        json.dump(content, f, ensure_ascii=False, default=str)

def transform():
    """
    Loads and transforms data from the .csv files into MongoDB insertable .json files. These files contain
    relations between the different objects using ObjectIds and can be used as a seed for the database.

    Sensors are split into files containing the individual sensors and measurements per building. This is to
    reduce the filesize as a 2GB+ json causes issues when editing and importing to MongoDB.
    """
    sensors = load_sensors()
    sensor_measurements = load_esave_exports()
    etcurves = load_etcurves()

    buildings = []
    curves = []

    for i, building_name in enumerate(sensors):
        building = {
            '_id': generate_mongodb_objectid(),
            'name': building_name
        }
        buildings.append(building)

        etcurve = {
            '_id': generate_mongodb_objectid(),
            'building': building['_id'],
            'etcurves': etcurves[building_name]
        }
        curves.append(etcurve)

        for sensor in sensors[building_name]:
            sensor['_id'] = generate_mongodb_objectid()
            sensor['building'] = building['_id']
            sensor['measurements'] = sensor_measurements[sensor['name']]
        
        # Dumping each building individually as a single file would otherwise get too large to resonably handle
        print(f'Writing sensors_{i}.json...')
        dump_to_json(f'sensors_{i}', sensors[building_name], True)

    print('Writing buildings.json...')
    dump_to_json('buildings', buildings)

    print('Writing etcurve.json...')
    dump_to_json('etcurves', curves)


def main():
    transform()
    

if __name__ == '__main__':
    main()
