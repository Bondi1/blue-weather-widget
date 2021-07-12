import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import useOpenWeather from "../../openWeather/useOpenWeather";


// Move to mock data file
const apiCurrentResponse = {
    dt: 1606508729,
    sunrise: 1606459100,
    sunset: 1606490693,
    temp: -2,
    feels_like: -3.72,
    pressure: 964,
    humidity: 90,
    dew_point: -1.54,
    uvi: 0,
    clouds: 0,
    visibility: 10000,
    wind_speed: 1.75,
    wind_deg: 102,
    weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
  };

  const mappedCurrent = {
    description: 'clear sky',
    icon: "01n",
    place: undefined,
    temperature: { current: '-2', min: undefined, max: undefined },
    wind: '2',
    humidity: 90,
  };

describe('Test useOpenWeather hook', () => {
    test('gets and map the data', async () => {
      const mock = new MockAdapter(axios);
      mock.onGet().reply(() => {
        const response = {
          current: apiCurrentResponse,
        };
        return [200, response];
      });
      const { result, waitForNextUpdate } = renderHook(() =>
        useOpenWeather({
          apikey: 'dummy key',
          type: 'geo',
          lat: '48.137154',
          lon: '11.576124',
          lang: 'en',
          unit: 'metric',
        }),
      );
  
      result.current.fetchData();
      await waitForNextUpdate();
  
      const expected = mappedCurrent;
  
      expect(result.current.data).toEqual(expected);
      expect(result.current.isLoading).toBeFalsy();
      expect(result.current.errorMessage).toEqual(null);
    });
  
    test('return error when http request fails', async () => {
      const mock = new MockAdapter(axios);
      mock.onGet().reply(500);
      const { result, waitForNextUpdate } = renderHook(() => useOpenWeather({}));
  
      result.current.fetchData();
      await waitForNextUpdate();
  
      expect(result.current.data).toEqual(null);
      expect(result.current.isLoading).toBeFalsy();
      expect(result.current.errorMessage).toEqual(
        'Request failed with status code 500',
      );
    });
    // test('reducer return default state', () => {
    //   const initialState = { data: 'initial' };
    //   const newState = fetchReducer(initialState, {
    //     type: 'non existent action',
    //   });
    //   expect(newState).toEqual(initialState);
    // });
  });