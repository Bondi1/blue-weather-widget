import * as React from 'react';
import { render, screen } from '@testing-library/react';
import CreateForm from '../../components/createForm';

test('should render Form component', () =>{
       
  const props = { createdWidgets: [{ 
    widget: "widget",
    units: "°Celsius",
    showWind: "On"}], setCreatedWidgets: () => {} };
  render(<CreateForm createdWidgets={props.createdWidgets} setCreatedWidgets={props.setCreatedWidgets}/>);
  const formElement = screen.getByText("Create Widget");
  expect(formElement).toBeInTheDocument();
});