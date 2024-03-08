import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import "normalize.css/normalize.css";
import DynamicStore from './dynamic_store';
import '@blueprintjs/core/lib/css/blueprint.css';
import "@blueprintjs/table/lib/css/table.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import 'App.css';
// import 'css/global.css';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import ParticleBackground from "./components/style/ParticleBackground";
import { useMemo } from 'react';
const particlesInit = (main) => {
  console.log(main);

  // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
};

const particlesLoaded = (container) => {
  console.log(container);
};

const schemaNames = [
  'attendance',
  'product_permissions',
  'product',
  'enrollment',
  'session',
  'site_product_availability',
  'site_object',
  'transaction',
  'user_site_availability',
  'folder',
  'theme',
  'booking',
  'event',
  'notification',
  'navigation',
  'post',
  'post_category',
  'commerce_category',
  'service',
  'variation',
  'shipment',
  'purchase',
  'style',
  'cart_item',
  'conversation',
];
console.log("hit23");
const dynamicStoreInstance = new DynamicStore(schemaNames);

// Create a root using createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));
// dynamicStoreInstance.store.subscribe(()=>{
//   console.log('new client state', dynamicStoreInstance.store.getState());
// });

// Render your application inside the root
root.render(
  <React.StrictMode>
    <Provider store={dynamicStoreInstance.store}>
      {/* <ParticleBackground /> */}
      <App schemaNames={schemaNames} storeInstance={dynamicStoreInstance} />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

