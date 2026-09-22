import React from "react";
import { CacheProvider } from "@emotion/react";
import { store, persistor } from '../store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Modal } from "../components/Modal";
import createEmotionCache from "../config/createEmotionCache";

import "../styles/global.css";
import { UrlListener } from "../components/UrlListener";
import { ErrorBoundary } from "../atoms/ErrorBoundary";
import { NotificationManager } from "../components/NotificationManager";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CacheProvider value={emotionCache}>
            <UrlListener />
            <Component {...pageProps} />
            <Modal />
            <NotificationManager />
          </CacheProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}

export default MyApp;
