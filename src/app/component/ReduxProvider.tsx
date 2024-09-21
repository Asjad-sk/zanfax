// src/components/ReduxProvider.tsx
"use client"; // Ensures this component is treated as a client component

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
      <Toaster richColors/>
    </SessionProvider>
  );
};

export default ReduxProvider;
