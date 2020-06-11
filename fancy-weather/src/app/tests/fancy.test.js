import {celsiumToFarenheit} from "../utils";

describe('Function celsiumToFarenheit ', () => {

  function testHugeNumber(val) {
    celsiumToFarenheit(val);
  }

  test('should throw error if inputs length more then 3', () => {
    expect(testHugeNumber(12341234)).toThrowError;
    expect(testHugeNumber(-273641987234)).toThrowError;
  });

  test('should throw error if input is empty', () => {
    expect(testHugeNumber).toThrowError
  });

  test('should return truthy value', () => {
    expect(celsiumToFarenheit(24)).toBeTruthy();
    expect(celsiumToFarenheit(-24)).toBeTruthy();
  });

  test('should return not undefined', () => {
    expect(celsiumToFarenheit(24)).not.toBeUndefined();
    expect(celsiumToFarenheit(-24)).not.toBeUndefined();
  });

  test('should return needed value', () => {
    expect(celsiumToFarenheit(50)).toEqual(122);
    expect(celsiumToFarenheit(-50)).toEqual(-58);
    expect(celsiumToFarenheit(-20)).toEqual(-4);
  });

});
