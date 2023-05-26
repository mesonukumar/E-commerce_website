import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading="null" persistor={persistor}>
    {/* we have created persistor inside store.js */}
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);