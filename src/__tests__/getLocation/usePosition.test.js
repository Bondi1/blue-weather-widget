import { renderHook } from '@testing-library/react-hooks';
import { usePosition } from "../../getLocation/usePosition";

test('tester', () =>{
    expect(true).toBe(true);
  });


  test('should get position information', () =>{

    const { positionInfo } = renderHook(() => usePosition());
    console.log(positionInfo);
    expect(positionInfo).not.toBe(null);  
    expect(positionInfo).not.toBe(undefined);  
  });