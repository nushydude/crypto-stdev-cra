// match snapshot
import { routes } from './routes';

describe('routes', () => {
  it('should match snapshot', () => {
    expect(routes).toMatchSnapshot();
  });
});