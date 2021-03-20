# API endpoints - Overview page

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
{
  "_id": ObjectId("60564970ecd73054d4869631"),
  "name": "Hesteskoen barnehage",
  "category": "Barnehage",
  "build_year": 1994,
  "area_2019": 139,
  "area_2020": 149
}
```

## Get total energy usage

**URL** : `/energy/usage`

**Method** : `GET`


### Success Responses

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information:

```json
{
  "energy-usage": 4000000
}
```

## Get count of building

Get the count of buildings that are monitored.

**URL** : `/buildings/count`

**Method** : `GET`

### Success Responses

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information:

```json
{
    "count": 300
}
```

## Get total area in m<sup>2</sup> for all the buildings

**URL** : `/buildings/area`

**Method** : `GET`

### Success Responses


**Code** : `200 OK`

**Content example** : Response will reflect back the updated information:

```json
{
    "area": 600000
}
```

## Get energy saved compared to last year

**URL** : `/energy/usageSave`

**Method** : `GET`

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information in percentage:

```json
{
    "energy-saving": 2.8
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

**Content example** : Response will reflect back the updated information:

```json
{
  "category": "Skole",
  "energy-usage": 30000
}
```