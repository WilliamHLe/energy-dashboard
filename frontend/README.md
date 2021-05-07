# TRDK02: Frontend

Frontend Web App for the Energy Dashboard built with React.

## Installation

1. Install with `npm install`
1. Obtain Highcharts license and install Highcharts
```sh
$ npm i highcharts highcharts-more highcharts-react-official
```
## Environment

```
REACT_APP_API_URI=      # Backend API _URI
```

## File structure 
### The frontend/src folder structure: 

```
src 
|___ assets
|___ components 
|      |__ building
|      |__ category
|      |__ energyTips
|      |__ headerBar
|      |__ mainPage
|      |__ navbar
|___ tests
|___ index.tsx
|___ App.tsx
|___ App.css
```

All tests is placed in the folder "test" and all images or icons in the "assets" folder. The components folder is seperated into several subfolders. These subfolders reflect this projects goal of achihieving high modularity, with logic split into small, seperate and reusable components. 

## Styling
In App.css global styling principles for the project are set. Examples of what should be defined in this file is font family, background-colors and styling on reccuring modules. Styling on individual components is located in seperate CSS files in the same folder where the related component is placed. 






