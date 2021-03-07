from collections import defaultdict
import bson

DATA_LOCATION = './data'

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

    """
    measurements = {
        "707057500068402960": [
            {
                date: '',
                measurement: 23.54
            },
            {
                date: '',
                measurement: 54.2
            },
        ]
    }
    """

    for part in range(1, 8):
        filename = f'EsaveExport_10121314_part{part}.csv'
        with open(f'{DATA_LOCATION}/{filename}', 'r') as f:
            sensor_names = f.readline().replace('\n', '').split(';')[1:]
            for line in f:
                clean_data = line.replace('\n', '').replace(',','.').split(';')
                date = clean_data.pop(0)

                daily_measurements = [{'date': date, 'measurement': float(measurement)} for measurement in clean_data if measurement]

                for i, daily_measurement in enumerate(daily_measurements):
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
    headers = ['Object', 'Description', 'Measurement', 'Name', 'UoM', 'Type']

    with open(f'{DATA_LOCATION}/Sensors.csv', 'r') as f:
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

    with open(f'{DATA_LOCATION}/ETCurves.csv', 'r') as f:
        next(f)

        for line in f:
            clean_data = line.replace('\n', '').replace('\xa0', '').split('\t')

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
    return bson.objectid.ObjectId()

def main():
    load_esave_exports()

if __name__ == '__main__':
    main()
