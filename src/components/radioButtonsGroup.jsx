import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

/**
 *  Bunch up the radio buttons into a group
 * @param {*} props input from the create form 
 * @returns radio button group
 * This is a modular component which is being used for radio buttons
 */
export default function RadioButtonsGroup(props) {
  const { title, name, values, value, handleChildChange } = props;
  const radioControls = values.map((m) => {
    return (
      <FormControlLabel
        key={m.key}
        value={m.value}
        labelPlacement="end"
        control={<Radio />}
        label={m.value}
      />
    );
  });

  return (
    <FormControl component="fieldset" title={`form-control-${title}`}>
      <FormLabel component="legend">{title}</FormLabel>
      <RadioGroup
        aria-label={name}
        name={name}
        value={value}
        onChange={(event) => handleChildChange(event.target.value)}
      >
        {radioControls}
      </RadioGroup>
    </FormControl>
  );
}
