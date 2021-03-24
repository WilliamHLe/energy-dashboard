# API endpoints - building type page and specific building

**Here you will find API endpoints for the building type page and specific building page.
Be aware that some of these endpoints can also be used in other pages.**

## Get energy saving tips for a building type

- Redesign not finished. TBA


## Get a specific building

**URL** : `/buildings/:id`

**Method** : `GET`

**URL Parameters** : `id=[ObjectId]` where id is the id of a specific building.

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information. A
search query with `id="ObjectId("60564970ecd73054d4869631")"`:

```json

{
    "_id": "60564970ecd73054d4869631",
    "name": "Hesteskoen barnehage",
    "category": "Barnehage",
    "build_year": 1994,
    "area_2019": 139,
    "area_2020": 149
}

```

## Get highscore for a building type

**URL** :
- `/highscore/:buildingType?year=true`

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
    "_id": "60564970ecd73054d4869631",
    "name": "Hesteskoen barnehage",
    "category": "Barnehage",
    "score": 98
  }
]
```

## Get badges for a specific building

**URL** : `/buildings/:id/badges`

**Method** : `GET`

**URL Parameters** : `id=[ObjectId]` where id is the id of a specific building.

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information. 

```json

{
  "badge1": true, 
  "badge2": true 
}

```
(spørs hvor mange badges vi har)

## Get energy usage for a specific building

**URL** : 
- `/buildings/:id/energy/usage`

**Method** : `GET`

**URL Parameters** : `id=[ObjectId]` where id is the id of a specific building.

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information.

```json
[
  {
    "energyUsage": 20000,
    "year": 2019
  },
  {
    "energyUsage": 30000,
    "year": 2018 
  }
]
```
(usikker på hvor mye vi ønsker å vise: mnd, dager, uker, timer..?)

## Get average energy usage for a specific building

**URL** : `/buildings/:id/energy/averageUsage`

**Method** : `GET`

**URL Parameters** : `id=[ObjectId]` where id is the id of a specific building.

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information. 

```json
{
  "averageUsage": 20000,
  "averageUsageBuildingType": 2300
}
```

## Get total energy usage for a specific building

**URL** : `/buildings/:id/energy/totalUsage`

**Method** : `GET`

**URL Parameters** : `id=[ObjectId]` where id is the id of a specific building.

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information. 

```json
{
  "totalUsage": 54032
}
```

## Get expected energy usage

**URL** : `/buildings/:id/energy/expectedUsage`

**Method** : `GET`

**URL Parameters** : `id=[ObjectId]` where id is the id of a specific building.

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information. 

```json
[
  {
    "expectedUsage": 40020,
    "date": 2016
  },
  {
    "expectedUsage": 38999,
    "date": 2017
  }
]
```

## Get information of energy usage for a specific building (month parameter)

**Mainly used to compare energy usage of last year**

**URL** : `/buildings/:id/energy/usage`

**Method** : `GET`

**URL Parameters** : `id=[ObjectId]` where id is the id of a specific building.

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information.

```json
[
  {
    "energyUsageDifference": 40020,
    "date": "20.12.20"
  },
  {
    "energyUsage": 38999,
    "month": "20.12.20"
  }
]
```

## Comparison of a specific building

- Redesign not finished. TBA




