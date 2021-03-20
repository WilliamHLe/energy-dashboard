# API endpoints for the overview page

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
  "name": "Trondheim Kommune - Hesteskoen barnehage"
}
```

## Get count of building

Get the count of buildings that are monitored.

**URL** : `/buildings/count`

**Method** : `GET`

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information:

```json
{
    "count": 300
}
```

## Get total area in m2 of all the buildings

**URL** : `/buildings/area`

**Method** : `GET`

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information:

```json
{
    "area": 600000
}
```

## Get energy saved compared to last year

**URL** : `/energy`

**Method** : `GET`

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information in percentage:

```json
{
    ?
}
```
## Get energy saved for a building type

**URL** : 
- `/energy/schools`
- `/energy/kindergardens`
- `/energy/nursinghomes`
- `/energy/sportfacilities`
- `/energy/otherbuildings`

**Method** : `GET`

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information in percentage:

```json
{
    "id": 1234,
}
```