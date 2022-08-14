import { hello } from '../src/index';
 
describe('testing index file', () => {
  test('empty string should result in zero', () => {
    expect(hello()).toBe("Hello world!");
  });
});
