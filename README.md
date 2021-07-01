# BLUE-WEATHER-WIDGET
# A Create React App which shows the current weather

This project was bootstrapped with [Create React App].

## Available Scripts

In the project directory, you can run:

### `npm install`

This sets up the app packages.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000] to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run-script build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

May serve it with a static server: 

### serve -s build

This app uses material-UI for designing the UI and react-hook-form for react form validations.

The app gets the location using navigator.geolocation using the usePosition hook.

The app gets the current weather for the location using useOpenWeather hook which in turn gets the weather data from the Open Weather Map API. The One Call API (Open Weather API) with the registered APP_ID_KEY is called to fetch the current weather details.

The app once running in the browser asks for the user permission to get the current location and on providing the permission will display the current weather.

The user can customise and create a custom widget using the CREATE WIDGET button. 
This brings up a modal form to get the details from the user. User cannot create widgets of same name as the ones already created or available in the dropdown.
Once the Create button is pressed, it closes the modal popup and makes the created widget available in the "Select Widget" dropdown for the user to select. When the user selects the widget from the dropdown the weather information will be displayed as per the custom settings of the selected widget.