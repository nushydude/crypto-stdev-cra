import { getCookieValue } from './getCookieValue';

describe('getCookieValue', () => {
  beforeEach(() => {
    // Clear document.cookie before each test
    document.cookie = '';
  });

  it('should return the value of the specified cookie', () => {
    document.cookie = 'testCookie=testValue';
    expect(getCookieValue('testCookie')).toBe('testValue');
  });

  it('should return null if the specified cookie does not exist', () => {
    expect(getCookieValue('nonExistentCookie')).toBeNull();
  });

  it('should return the correct value if multiple cookies are present', () => {
    document.cookie = 'cookie1=value1';
    document.cookie = 'cookie2=value2';
    expect(getCookieValue('cookie1')).toBe('value1');
    expect(getCookieValue('cookie2')).toBe('value2');
  });

  it('should handle cookies with spaces around the name', () => {
    document.cookie = ' testCookieWithSpaces = testValue ';
    expect(getCookieValue('testCookieWithSpaces')).toBe('testValue');
  });

  it('should return null if the cookie value is empty', () => {
    document.cookie = 'emptyCookie=';
    expect(getCookieValue('emptyCookie')).toBe(null);
  });
});
