# Progressive Web App (PWA) Documentation

## Overview

Crypto StDev is built as a Progressive Web App (PWA) using Vite's PWA plugin. This document covers the PWA implementation, service worker configuration, and offline capabilities.

## Configuration

### Vite PWA Plugin

The PWA functionality is configured in `vite.config.ts`:

```typescript
VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'icons/*.png', 'icons/*.svg'],
  manifest: {
    name: 'Crypto StDev',
    short_name: 'Crypto StDev',
    description: 'Crypto Standard Deviation Calculator',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
    start_url: '/',
    icons: [
      // Icon configurations
    ]
  },
  workbox: {
    cleanupOutdatedCaches: true,
    sourcemap: true
  }
})
```

### Service Worker

The service worker is managed by the `ServiceWorker` component:

```typescript
export const ServiceWorker = () => {
  useEffect(() => {
    const handleUpdate = (event: CustomEvent) => {
      console.info('Service worker: update available.');
      toast.info(({ closeToast }) => <UpdateAvailableAlert closeToast={closeToast} />, {
        position: 'bottom-right',
        autoClose: false,
        hideProgressBar: true,
        toastId: 'app_update_prompt',
      });
    };

    const handleSuccess = (event: CustomEvent) => {
      console.info('Service worker: successfully registered.');
    };

    window.addEventListener('vite-pwa:update', handleUpdate as EventListener);
    window.addEventListener('vite-pwa:success', handleSuccess as EventListener);

    return () => {
      window.removeEventListener('vite-pwa:update', handleUpdate as EventListener);
      window.removeEventListener('vite-pwa:success', handleSuccess as EventListener);
    };
  }, []);

  return null;
};
```

## Features

### Offline Support

The PWA provides offline support through:
- Service worker caching
- IndexedDB for data storage
- Background sync for data updates

### Installable

Users can install the app on their devices:
- Android: Through Chrome's "Add to Home Screen"
- iOS: Through Safari's "Add to Home Screen"
- Desktop: Through browser's install prompt

### Push Notifications

Push notifications are handled through OneSignal:
```typescript
// OneSignal initialization
OneSignal.init({
  appId: process.env.VITE_ONESIGNAL_APP_ID,
  allowLocalhostAsSecureOrigin: true,
});
```

## Icons

The app uses a set of icons for different platforms and sizes:

- 72x72: Android devices
- 96x96: Android devices
- 128x128: Chrome Web Store
- 144x144: Android devices
- 152x152: iOS devices
- 192x192: Android devices
- 384x384: Android devices
- 512x512: PWA splash screen

Icons are generated using the `generate-icons` script:
```bash
npm run generate-icons
```

## Testing PWA Features

### Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open Chrome DevTools
3. Go to Application tab
4. Check:
   - Service Workers
   - Cache Storage
   - IndexedDB
   - Manifest

### Production

1. Build the app:
   ```bash
   npm run build
   ```

2. Preview the build:
   ```bash
   npm run preview
   ```

3. Test offline functionality:
   - Enable offline mode in DevTools
   - Check if the app works without internet
   - Verify data persistence

## Troubleshooting

### Service Worker Issues

If the service worker is not working:
1. Clear browser cache
2. Unregister service worker in DevTools
3. Reload the page
4. Check console for errors

### Update Issues

If updates are not being detected:
1. Check service worker registration
2. Verify manifest version
3. Clear browser cache
4. Check network tab for update requests

### Offline Issues

If offline functionality is not working:
1. Check cache storage
2. Verify IndexedDB setup
3. Test with different browsers
4. Check service worker scope

## Best Practices

1. **Cache Strategy**:
   - Use appropriate cache strategies for different resources
   - Implement cache versioning
   - Handle cache invalidation

2. **Performance**:
   - Optimize assets for offline use
   - Implement proper loading states
   - Use background sync for updates

3. **User Experience**:
   - Show offline indicators
   - Provide update notifications
   - Handle offline data gracefully

4. **Security**:
   - Use HTTPS in production
   - Implement proper CSP headers
   - Secure service worker scope

## Resources

- [Vite PWA Plugin Documentation](https://vite-pwa-org.netlify.app/)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)
- [PWA Checklist](https://web.dev/pwa-checklist/)
- [MDN Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) 