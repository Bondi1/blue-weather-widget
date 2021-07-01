import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

/**
 * A dropdown to display all the widgets and select one
 * 
 */

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SelectDropdown(props) {
  const classes = useStyles();
  const [title, setTitle] = React.useState("");

  let allWidgets = props.createdWidgets;

  const handleChange = (event) => {
    setTitle(event.target.value);
    const filteredWidgets = allWidgets.filter(
      (m) => m.widget === event.target.value
    );
  
    props.setSelectedWidget(filteredWidgets[0]);
  };
  const menuItemArray = allWidgets.map((m) => {
    return (
      <MenuItem key={m.widget} value={m.widget}>
        {m.widget}
      </MenuItem>
    );
  });
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id={title.length.toString()}>Select Widget</InputLabel>
        <Select
          labelId="helper-label"
          id={(title.length * 2).toString()}
          value={title}
          onChange={handleChange}
        >
          {menuItemArray};
        </Select>
        <FormHelperText>
          Please select the widget to display the Weather
        </FormHelperText>
      </FormControl>
    </>
  );
}
