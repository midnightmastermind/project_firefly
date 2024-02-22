import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";
import "normalize.css/normalize.css";

import '@blueprintjs/core/lib/css/blueprint.css';
import "@blueprintjs/table/lib/css/table.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import 'App.css';
// import 'css/global.css';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import ParticleBackground from "./components/style/ParticleBackground";

const particlesInit = (main) => {
  console.log(main);

  // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
};

const particlesLoaded = (container) => {
  console.log(container);
};

// Create a root using createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));
store.subscribe(()=>{
  console.log('new client state', store.getState());
});

// Render your application inside the root
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ParticleBackground /> */}
      <App />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

