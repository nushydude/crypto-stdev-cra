import React from 'react';
import ReactDOM from 'react-dom/client';
import { Chart as ChartJS, registerables } from 'chart.js';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { App } from './App';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { AppSettingsProvider } from './providers/AppSettingsProvider';
import UserProvider from './providers/UserProvider';

ChartJS.register(...registerables);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <AppSettingsProvider>
          <App />
        </AppSettingsProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register({
//   onSuccess: () => console.log('SW reg success'),
//   onUpdate: (reg) => console.log('SW reg:', reg),
// });
// serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
