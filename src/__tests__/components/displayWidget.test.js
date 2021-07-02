import * as React from 'react';
import { render, screen } from '@testing-library/react';
import DisplayWidget from '../../components/displayWidget';


test('should render Display Widget component', () =>{
       
  const props = { selectedWidget: [{ 
    widget: "widget",
    units: "°Celsius",
    showWind: "On"}]};
  render(<DisplayWidget selectedWidget={props.selectedWidget}/>);
  const displayElement = screen.getByTitle("loading");
  expect(displayElement).toBeInTheDocument();
});