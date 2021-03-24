# API endpoints - building type page

## Search for a specific building

**URL** : `/search/:buildingName`

**Method** : `GET`

**URL Parameters** : `buildingName=[string]` where buildingName is the name of a specific building.

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information. A
search query with `buildingName="Hesteskoen barnehage"`:

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

## Get a specific building

**URL** : `/buildings/:buildingType/:buildingName`

**Method** : `GET`

**URL Parameters** : `buildingName=[string]` where buildingName is the name of a specific building.

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information. A
search query with `buildingName="Hesteskoen"`:

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

## Get highscore for a building type

**URL** : `/buildings/:buildingType/highscore`

**Method** : `GET`

**URL Parameters** : `buildingName=[string]` where buildingName is the name of a specific building.

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information. A
search query with `buildingName="Hesteskoen"`:

```json
[
  {
    "_id": ObjectId("60564970ecd73054d4869631"),
    "name": "Hesteskoen barnehage",
    "category": "Barnehage",
    "score": 98 ?
    ...
  }
]
```


## Search for a specific building

**URL** : `/search/:buildingName`

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

# Specific building

## Get badges for a specific building

**URL** : `/buildings/:buildingType/:buildingName/badges`

**Method** : `GET`

**URL Parameters** : `buildingName=[string]` where buildingName is the name of a specific building.

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information. A
search query with `buildingName="Analysesenteret"`:

```json

{
  "badge1": true, 
  "badge2": true ? (spørs hvor mange badges vi har)
}

```

## Get average energy usage

**URL** : `/buildings/:buildingType/:buildingName/energyUsage`

**Method** : `GET`

**URL Parameters** : `buildingName=[string]` where buildingName is the name of a specific building.

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information. A
search query with `buildingName="Analysesenteret"`:

```json
{
  "average-energy-usage": 20000,
  "average-energy-usage-buildingType": 2300
}
```







