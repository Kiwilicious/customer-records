const { processFile, filterCustomers, degreeToRadian, findDistance } = require('./nearbyCustomers');

describe('processFile', () => {
  console.log = jest.fn();

  test('should throw an error when fed a non-JSON file', () => {
    return processFile('nearbyCustomers.js')
      .then(() => {
        expect(1).toBe(2);
      })
      .catch(err => {
        expect(err.constructor).toBe(SyntaxError);
      });
  });

  test('should throw an error when each line of the input file isn\'t a JSON object', () => {
    return processFile('package.json')
      .then(() => {
        expect(1).toBe(2);
      })
      .catch(err => {
        expect(err.constructor).toBe(SyntaxError);
      });
  });
  
  test('should print to the console', () => {
    return processFile('gistfile1.txt')
      .then(res => {
        filterCustomers(res);
        expect(console.log).toBeCalled();
      });
  });

  test('should return undefined', () => {
    return processFile('gistfile1.txt')
      .then(res => {
        const result = filterCustomers(res);
        expect(result).toBeUndefined();
      });
  });

});
  
describe('degreeToRadian', () => {
  const inDegree = 10;
  const inRadian = degreeToRadian(inDegree);

  test('should return a value', () => {
    expect(inRadian).toBeDefined();
  });
  
  test('should return a value less than the input', () => {
    expect(inRadian).toBeLessThan(inDegree);
  });

});

describe('findDistance', () => {
  const distance1 = findDistance(1, 1, 2, 2);
  const distance2 = findDistance(-2.5, 1, 4, 0.3);
  const distance3 = findDistance(-3.3, -4, -4.7, -1.6);

  test('should return a value', () => {
    expect(distance1).toBeDefined();
    expect(distance2).toBeDefined();
    expect(distance3).toBeDefined();
  });
  
  test('should return a value less than half of Earth\'s circumference', () => {
    const earthRadius = 6378.137;
    const earthCircumference = 2 * Math.PI * earthRadius;
    expect(distance1).toBeLessThan(earthCircumference / 2);
    expect(distance2).toBeLessThan(earthCircumference / 2);
    expect(distance3).toBeLessThan(earthCircumference / 2);
  });
  
});