# Hooks Documentation

## Overview

This document provides detailed information about the custom React hooks used in the Crypto StDev application.

## Custom Hooks

### useBinanceKline
- **Location**: `src/hooks/useBinanceKline.ts`
- **Description**: Fetches and manages kline (candlestick) data from Binance API
- **Dependencies**:
  - React Query
  - Axios
- **Parameters**:
  - `configs`: Array of configuration objects
  - `fetchOnMount`: Boolean (whether to fetch on component mount)
- **Returns**:
  - `data`: Array of kline data
  - `fetchStatus`: String (loading state)
  - `refetch`: Function to manually refetch data

### usePersistedState
- **Location**: `src/hooks/usePersistedState.ts`
- **Description**: Persists state in localStorage
- **Dependencies**: None
- **Parameters**:
  - `key`: String (localStorage key)
  - `initialState`: Any (initial state value)
  - `setState`: Function (state setter)
- **Returns**: None

### useClickAway
- **Location**: `src/hooks/useClickAway.ts`
- **Description**: Detects clicks outside a component
- **Dependencies**: None
- **Parameters**:
  - `ref`: React ref
  - `handler`: Function (callback for click outside)
- **Returns**: None

## Usage Examples

### Using useBinanceKline
```tsx
import { useBinanceKline } from './hooks/useBinanceKline';

const KlineChart = () => {
  const configs = [
    { symbol: 'BTCUSDT', interval: '1h' },
    { symbol: 'ETHUSDT', interval: '1h' }
  ];

  const { data, fetchStatus } = useBinanceKline(configs, true);

  if (fetchStatus === 'loading') {
    return <LoadingSpinner />;
  }

  return <Chart data={data} />;
};
```

### Using usePersistedState
```tsx
import { usePersistedState } from './hooks/usePersistedState';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  
  usePersistedState('theme', theme, setTheme);

  return (
    <select value={theme} onChange={e => setTheme(e.target.value)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
};
```

### Using useClickAway
```tsx
import { useClickAway } from './hooks/useClickAway';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => setIsOpen(false));

  return (
    <div ref={ref}>
      <button onClick={() => setIsOpen(true)}>Open</button>
      {isOpen && <DropdownContent />}
    </div>
  );
};
```

## Best Practices

1. **Hook Naming**:
   - Start with 'use' prefix
   - Use descriptive names
   - Follow React's hook naming conventions

2. **Dependencies**:
   - List all dependencies in the dependency array
   - Use useCallback for function dependencies
   - Use useMemo for expensive computations

3. **State Management**:
   - Keep hooks focused and single-purpose
   - Use appropriate state management solutions
   - Handle loading and error states

4. **Performance**:
   - Memoize expensive calculations
   - Avoid unnecessary re-renders
   - Clean up effects properly

5. **Testing**:
   - Test hook behavior in isolation
   - Test edge cases and error states
   - Use React Testing Library for hook tests

## Common Patterns

### Data Fetching
```tsx
const useData = (id: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/data/${id}`);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
};
```

### Form Handling
```tsx
const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const reset = () => setValues(initialState);

  return { values, handleChange, reset };
};
```

### Window Size
```tsx
const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};
``` 