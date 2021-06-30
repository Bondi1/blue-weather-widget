import React from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import RadioButtonsGroup from "./radioButtonsGroup";

function rand() {
  return Math.round(Math.random() * 15) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function CreateForm(props) {
  const { setCreatedWidgets, createdWidgets } = props;
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [widget, setWidget] = React.useState();
  const [units, setUnits] = React.useState("°Celsius");
  const [showWind, setShowWind] = React.useState("On");

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    handleClose();
    let weatherWidget = {
      widget: widget,
      units: units,
      showWind: showWind,
    };

    setCreatedWidgets([...createdWidgets, weatherWidget]);
  };

  const metric = [
    { key: "°C", value: "°Celsius" },
    { key: "℉", value: "℉arenheit" },
  ];

  const wind = [
    { key: "0", value: "On" },
    { key: "1", value: "Off" },
  ];

  const saveTitle = (event) => {
    setWidget(event.target.value);
  };

  const saveMetric = (value) => {
    setUnits(value);
  };

  const saveWind = (value) => {
    setShowWind(value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="modal-title">Weather Widget</h2>
      <p id="modal-description"></p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <label htmlFor="Title">Title</label>
          </div>
          <input
            type="text"
            placeholder="Title of widget"
            {...register("Title", {
              required: "Title is required",
              maxLength: 250,
              validate: (textValue) => {
                const filteredWidgets = createdWidgets.filter(
                  (m) => m.widget === textValue
                );
                const result = filteredWidgets.length === 0;
                if (!result)
                  alert("Widget Title exists, Please provide a different one!");
                return result;
              },
            })}
            onChange={(event) => saveTitle(event)}
          />
        </div>

        <div>
          <RadioButtonsGroup
            title="Temperature"
            name="metric"
            values={metric}
            value={units}
            handleChildChange={(value) => saveMetric(value)}
          />
        </div>
        <div>
          <RadioButtonsGroup
            title="Wind"
            name="showWind"
            values={wind}
            value={showWind}
            handleChildChange={(value) => saveWind(value)}
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
  return (
    <div>
      <Button
        variant="contained"
        type="button"
        color="primary"
        onClick={handleOpen}
      >
        Create Widget
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
