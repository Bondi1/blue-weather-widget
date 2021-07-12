import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import useOpenWeather from "../openWeather/useOpenWeather";
import { usePosition } from "../getLocation/usePosition";
import "../../src/css/widget.css";

const APP_ID_KEY = "";

/**
 * A Card to show the weather based on the chosen widget
 */
function GetWeatherInfo(location) {
  return useOpenWeather({
    key: APP_ID_KEY,
    lat: location.latitude,
    lon: location.longitude,
    lang: "en", // English always
    unit: "metric", // Assuming we will get it in metric always
  });
}

function DisplayWidget(props) {
  const units =
    props.selectedWidget.units === undefined
      ? "metric"
      : props.selectedWidget.units.toLowerCase() === "°celsius"
      ? "metric"
      : "imperial";
  const useStyles = makeStyles({
    root: {
      maxWidth: 545,
      backgroundColor: "#cbedf7",
    },
  });
  const classes = useStyles();
  const location = usePosition();
  let { data, isLoading, errorMessage } = GetWeatherInfo(location);

  if (isLoading) {
    return <div title="loading">Loading...</div>;
  }
  if (data === null) {
    return <div>Data Unavailable</div>;
  }
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  // Conversion logic based on the options chosen
  const title =
    props.selectedWidget.widget === undefined
      ? "Default"
      : props.selectedWidget.widget;
  const tempUnits = units === "imperial" ? "°F" : "°C";
  const temperatureValue =
    units === "imperial"
      ? (data.temperature.current * 9) / 5 + 32
      : data.temperature.current;
  const showWindData = props.selectedWidget.showWind === "On" ? true : false;
  const windSpeedUnits = units === "imperial" ? "miles/hour" : "km/hour";
  const windSpeedValue =
    units === "imperial" ? data.wind * 2.237 : data.wind * 3.6; // by default the speed in metre per sec
  const icon = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;

  // Add the info onto a card and return
  return (
    <Card className={classes.root} title="widget">
      <div className="row">
        <div className="column">
          <img src={icon} alt="weather" />
        </div>
        <div className="column">
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Title : {title}
              </Typography>
              <Typography variant="subtitle1" color="textPrimary" component="p">
                Timezone: {data.place}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="h4">
                Description : {data.description}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="p"
              >
                Units : {units}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="p"
              >
                Temperature : {Math.round(temperatureValue)} {tempUnits}
              </Typography>
              {showWindData && (
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  component="p"
                >
                  Wind : {windSpeedValue} {windSpeedUnits}
                </Typography>
              )}
            </CardContent>
          </CardActionArea>
        </div>
      </div>
    </Card>
  );
}

export default DisplayWidget;
