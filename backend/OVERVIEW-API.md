# API endpoints - Overview page

## Search for a specific building

**URL** : `/search?buildingName={query}` (kan legge til )

**Method** : `GET`

**URL Parameters** : `buildingName=[string]` where buildingName is the name of a specific building.

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information. A
search query with `buildingName="Analysesenteret"`:

```json
[
  {
    "_id": ObjectId("60564970ecd73054d4869631"),
    "name": "Hesteskoen barnehage",
    "category": "Barnehage",
    "build_year": 1994,
    "area_2019": 139,
    "area_2020": 149,
    ...
  }
]
```


## Get count of building

Get the count of buildings that are monitored.

**URL** : `/buildings?quantity=true`

**Method** : `GET`

### Success Responses

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information:

```json
{
    "count": 300
}
```


## Get energy saved for a building type

**URL** : 
- `/energy/usageSave/:buildingType`

**Method** : `GET`

**URL Parameters** : `buildingType=[string]` where buildingType is the type of building.

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information in percentage:

```json
{
  "category": "Barnehage",
  "energy-saving": 1.8
}
```

## Get energy carrier for a building type

**URL** :
- `/energy/carrier/:buildingType`

**Method** : `GET`

**URL Parameters** : `buildingType=[string]` where buildingType is the type of building.

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information:

```json
{
    "category": "Skole",
    "Fjernvarme": 3000,
    "Fastkraft": 2000
}
```

## Get energy usage for a building type

**URL** :
- `/energy/usage/:buildingType`

**Method** : `GET`

**URL Parameters** : `buildingType=[string]` where buildingType is the type of building.

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information with an array of objects for each year:

```json
[
  {
    "category": "Skole",
    "energy-usage": 30000,
    "year": 2018
  }
]
```


## Get energy usage, energy saved, total area and amount of buildings for a specific building

**URL** :
- `/metrics?buildingType={barnehage}`
- `/metrics?buildingType={overview}` for total metrics for the overview page

**Method** : `GET`

**URL Parameters** : `buildingType=[string]` where buildingType is the type of building.

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information:

```json
{
  "buildingCount": 234,
  "buildingTotalArea": 234234,
  "energyUsage": 40000,
  "energySaved": 23
}
```

