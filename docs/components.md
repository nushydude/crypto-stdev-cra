# Component Documentation

## Overview

This document provides detailed information about the React components used in the Crypto StDev application.

## Core Components

### App
- **Location**: `src/App.tsx`
- **Description**: Root component of the application
- **Dependencies**: 
  - React Router
  - AppSettingsProvider
  - UserProvider
  - QueryClientProvider
  - Sentry
- **Props**: None
- **State**: None

### Header
- **Location**: `src/components/Header.tsx`
- **Description**: Main navigation header
- **Dependencies**:
  - HamburgerMenu
  - ProfileLink
  - React Router
- **Props**: None
- **State**: None

### HamburgerMenu
- **Location**: `src/components/HamburgerMenu.tsx`
- **Description**: Mobile navigation menu
- **Dependencies**:
  - Styled Components
  - React Router
  - UserContext
- **Props**:
  - `links`: Array of navigation links
  - `headerHeight`: Number (height of header for positioning)
- **State**:
  - `menuVisible`: Boolean (controls menu visibility)

### ProfileLink
- **Location**: `src/components/ProfileLink.tsx`
- **Description**: User profile navigation link
- **Dependencies**:
  - UserContext
  - React Router
- **Props**: None
- **State**: None

### SearchableDropdown
- **Location**: `src/components/SearchableDropdown.tsx`
- **Description**: Searchable dropdown component
- **Dependencies**:
  - React Icons
  - Styled Components
- **Props**:
  - `values`: Array of string values
  - `selectedValue`: Currently selected value
  - `onChange`: Callback function for value changes
  - `noResultsMessage`: Message to display when no results found
- **State**:
  - `isOpen`: Boolean (controls dropdown visibility)
  - `searchTerm`: String (current search input)

### IconWrapper
- **Location**: `src/components/IconWrapper.tsx`
- **Description**: Wrapper for React Icons
- **Dependencies**: React Icons
- **Props**:
  - `icon`: React Icon component
  - `...props`: Additional props passed to the icon
- **State**: None

### UpdateAvailableAlert
- **Location**: `src/components/UpdateAvailableAlert.tsx`
- **Description**: Alert component for PWA updates
- **Dependencies**: None
- **Props**:
  - `closeToast`: Function to close the toast notification
- **State**: None

## Provider Components

### AppSettingsProvider
- **Location**: `src/providers/AppSettingsProvider.tsx`
- **Description**: Manages application settings
- **Dependencies**: None
- **Props**: None
- **State**:
  - `settings`: Object containing app settings
  - `updateSettings`: Function to update settings

### UserProvider
- **Location**: `src/providers/UserProvider.tsx`
- **Description**: Manages user authentication and data
- **Dependencies**:
  - Axios
  - JWT Decode
- **Props**: None
- **State**:
  - `user`: User object
  - `isLoggedIn`: Boolean
  - `login`: Function to handle user login
  - `logout`: Function to handle user logout

## Service Components

### ServiceWorker
- **Location**: `src/components/ServiceWorker.tsx`
- **Description**: Manages PWA service worker
- **Dependencies**:
  - React Toastify
  - UpdateAvailableAlert
- **Props**: None
- **State**: None

## Styled Components

### HamburgerMenu.styles.tsx
- **Location**: `src/components/HamburgerMenu.styles.tsx`
- **Description**: Styled components for HamburgerMenu
- **Components**:
  - `TopBar`, `MiddleBar`, `BottomBar`: Hamburger menu bars
  - `MenuContainer`: Menu container with animation

### SearchableDropdown.styles.tsx
- **Location**: `src/components/SearchableDropdown.styles.tsx`
- **Description**: Styled components for SearchableDropdown
- **Components**:
  - `DropdownContainer`: Main container
  - `DropdownButton`: Trigger button
  - `DropdownContent`: Dropdown content with search
  - `DropdownItem`: Individual dropdown items

## Usage Examples

### Using SearchableDropdown
```tsx
import { SearchableDropdown } from './components/SearchableDropdown';

const MyComponent = () => {
  const values = ['BTC', 'ETH', 'BNB'];
  const [selected, setSelected] = useState('BTC');

  return (
    <SearchableDropdown
      values={values}
      selectedValue={selected}
      onChange={setSelected}
      noResultsMessage="No cryptocurrencies found"
    />
  );
};
```

### Using HamburgerMenu
```tsx
import { HamburgerMenu } from './components/HamburgerMenu';

const Header = () => {
  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { to: '/settings', label: 'Settings', icon: <SettingsIcon /> }
  ];

  return <HamburgerMenu links={links} headerHeight={64} />;
};
```

## Best Practices

1. **Component Organization**:
   - Keep components small and focused
   - Use TypeScript for type safety
   - Follow the single responsibility principle

2. **Styling**:
   - Use Tailwind CSS for utility classes
   - Use Styled Components for complex styles
   - Keep styles close to components

3. **State Management**:
   - Use React Query for server state
   - Use React Context for global UI state
   - Use local state for component-specific state

4. **Performance**:
   - Memoize expensive computations
   - Use React.memo for pure components
   - Implement proper loading states

5. **Testing**:
   - Write unit tests for components
   - Use Testing Library for component tests
   - Test component interactions 