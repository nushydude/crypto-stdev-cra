# Development Setup

This guide will help you set up the development environment for Crypto StDev.

## Prerequisites

- Node.js 22.x
- npm 9.x or later
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/crypto-stdev.git
   cd crypto-stdev
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```env
   VITE_BUILD_NUMBER=1.0.0
   VITE_SENTRY_DSN=your_sentry_dsn
   VITE_ONESIGNAL_APP_ID=your_onesignal_app_id
   ```

## Development Server

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run lint:css` - Lint CSS files
- `npm run format` - Format code with Prettier
- `npm run generate-icons` - Generate PWA icons

## Code Style

The project uses:
- ESLint for JavaScript/TypeScript linting
- Prettier for code formatting
- Stylelint for CSS linting

## Git Hooks

The project uses Husky for Git hooks:
- Pre-commit: Runs linting and formatting
- Pre-push: Runs tests

## IDE Setup

### VS Code

Recommended extensions:
- ESLint
- Prettier
- Stylelint
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

### WebStorm

Recommended plugins:
- ESLint
- Prettier
- Stylelint
- Tailwind CSS

## Debugging

### Chrome DevTools

1. Open Chrome DevTools (F12)
2. Go to Sources tab
3. Enable source maps in settings
4. Set breakpoints in your code

### VS Code Debugging

1. Install "Debugger for Chrome" extension
2. Create launch.json:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "type": "chrome",
         "request": "launch",
         "name": "Launch Chrome against localhost",
         "url": "http://localhost:3000",
         "webRoot": "${workspaceFolder}"
       }
     ]
   }
   ```

## Common Issues

### TypeScript Errors

If you encounter TypeScript errors:
1. Run `npm run type-check`
2. Check for missing type definitions
3. Update TypeScript version if needed

### Styling Issues

If Tailwind CSS is not working:
1. Check if PostCSS is properly configured
2. Verify Tailwind configuration
3. Clear npm cache and reinstall dependencies

### Service Worker Issues

If PWA features are not working:
1. Check if service worker is registered
2. Clear browser cache
3. Verify manifest.json configuration

## Contributing

1. Create a new branch
2. Make your changes
3. Run tests
4. Submit a pull request

## Resources

- [React Documentation](https://reactjs.org/docs)
- [Vite Documentation](https://vitejs.dev/guide)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs) 