import { render, screen } from '@testing-library/react';
import RadioButtonsGroup from '../../components/radioButtonsGroup';


test('should render Temperature RadioButtonsGroup component', () =>{
    const props = { title:"Temperature", name:"TemperatureUnits", values:[
        { key: "°C", value: "°Celsius" },
        { key: "℉", value: "℉arenheit" },
      ], value:"°Celsius", handleChildChange: () => {} };
    render(<RadioButtonsGroup title={props.title} name={props.name}
        values={props.values} value={props.value} handleChildChange={props.handleChildChange} />);
    const rbgElement = screen.getByTitle('form-control-Temperature');
    expect(rbgElement).toBeInTheDocument();
});    