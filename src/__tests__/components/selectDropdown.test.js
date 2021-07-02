import * as React from 'react';
import { render, screen } from '@testing-library/react';
import SelectWidget from '../../components/selectDropdown';


test('should render Form component', () =>{
  const props = { createdWidgets: [{ 
    widget: "widget",
    units: "°Celsius",
    showWind: "On"}], setCreatedWidgets: () => {} };
  render(<SelectWidget createdWidgets={props.createdWidgets} setCreatedWidgets={props.setCreatedWidgets}/>);
  const formElement = screen.getByText("Select Widget");
  expect(formElement).toBeInTheDocument();
});