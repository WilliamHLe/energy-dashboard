# API endpoints - Overview page

**Here you will find API endpoints for the overview page. 
Be aware that some of these endpoints can also be used in other pages.**

## Search for a specific building

**URL** : `/search?buildingName={query}` (kan legge til flere queries etterhvert)

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
    "_id": "60564970ecd73054d4869631",
    "name": "Hesteskoen barnehage"
  }
]
```

## Get energy carrier for a building type

**URL** :
- `/energy/carrier/:buildingType` ?
- `/buildings/:buildingType/energy/carrier` ?
- `/buildings/energy/carrier?buildingType={query}` ?

**Method** : `GET`

**URL Parameters** : `buildingType=[string]` where buildingType is the type of building. 
A query with `buildingType="Skole"`:

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information:

```json
{
    "Fjernvarme": 3000,
    "Fastkraft": 2000,
    "Olje": 20
}
```

## Get energy usage for a building type

**URL** :
- `/energy/usage/:buildingType` ?
- `/buildings/energy/usage?buildingType={query}` ? 

**Method** : `GET`

**URL Parameters** : `buildingType=[string]` where buildingType is the type of building. A query with `buildingType="Skole"`:

### Success Responses

**Condition** : Data provided is valid.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information with an array of objects for each year:

```json
[
  {
    "category": "Skole",
    "energyUsage": 20000,
    "year": 2019
  },
  {
    "category": "Skole",
    "energyUsage": 30000,
    "year": 2018
  }
]
```


## Get energy usage, energy saved, total area and amount of buildings for a specific building/overview page

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