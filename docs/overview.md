# Project Overview

Crypto StDev is a web application that calculates and visualizes standard deviation metrics for cryptocurrency price data. The application provides real-time data analysis and visualization tools for cryptocurrency traders and analysts.

## Features

- Real-time cryptocurrency price data from Binance API
- Standard deviation calculations and visualizations
- Interactive charts and graphs
- User authentication and data persistence
- Progressive Web App (PWA) support
- Offline capabilities
- Responsive design for all devices

## Tech Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite
- **State Management**: React Query (TanStack Query)
- **Styling**: Tailwind CSS + Styled Components
- **Testing**: Vitest + Testing Library
- **Type Checking**: TypeScript
- **Routing**: React Router
- **API Client**: Axios
- **Charts**: Chart.js
- **Error Tracking**: Sentry
- **Push Notifications**: OneSignal
- **PWA Support**: Vite PWA Plugin

## Project Structure

```
crypto-stdev-cra/
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   ├── config/         # Configuration files
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── providers/      # Service providers
│   ├── services/       # API and other services
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   └── __tests__/      # Test files
├── docs/               # Documentation
└── scripts/            # Build and utility scripts
```

## Dependencies

Key dependencies and their versions:

- React: ^18.3.1
- React DOM: ^18.3.1
- React Query: ^5.74.4
- React Router: ^5.3.4
- Tailwind CSS: ^3.4.4
- Styled Components: ^6.1.17
- Chart.js: ^4.4.9
- TypeScript: ^5.8.3
- Vite: ^5.4.18

## Browser Support

The application is designed to work on modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

The application is optimized for:
- Fast initial load times
- Smooth animations and transitions
- Efficient data fetching and caching
- Responsive design across all devices
- Offline functionality through service workers 