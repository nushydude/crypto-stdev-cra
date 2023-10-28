/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';

// declare const self: ServiceWorkerGlobalScope;

clientsClaim();

// Any other custom service worker logic can go here.
self.addEventListener('push', (event) => {
  if (!event.data) {
    return;
  }

  const data = event.data.json();
  console.log('New notification', data);
  const options = {
    body: data.body,
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});
