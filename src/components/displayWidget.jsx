import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import useOpenWeather from "../openWeather/useOpenWeather";
import { usePosition } from "../getLocation/usePosition";
import "../../src/css/widget.css";

function Refresh(location) {
  return useOpenWeather({
    key: "785cd7c93337f5043e4584522cf4392d",
    lat: location.latitude,
    lon: location.longitude,
    lang: "en",
    unit: "metric",
  });
}

function DisplayWidget(props) {
  const units =
    props.selectedWidget.units === undefined
      ? "metric"
      : props.selectedWidget.units.toLowerCase();
  const useStyles = makeStyles({
    root: {
      maxWidth: 545,
      backgroundColor: "#cbedf7",
    },
  });
  const classes = useStyles();
  const location = usePosition();
  let { data, isLoading, errorMessage } = Refresh(location);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (data === null) {
    return <div>Data Unavailable</div>;
  }
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

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
  return (
    <Card className={classes.root}>
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