import { reducers, defaultState } from './store';
import { saveState, loadState } from './actions';
import { startRouters } from './url';
import { createStore } from 'obake.js';
import { AppRoot } from './ui';
import { BaseStyles } from './styles';
import morph from 'nanomorph';

//Default render
const ROOT_NODE = document.body.querySelector('#app');
export const storageKey = "pokemon_state";

//Create Store
const savedState = loadState(storageKey, defaultState)
export const state = createStore(
  savedState,
  { renderer, saveState },
  reducers
);

//Render Loop function
// spec - https://dom.spec.whatwg.org/#concept-node-equals
function renderer(newState) {
  morph(ROOT_NODE, AppRoot(newState), {
    onBeforeElUpdated: (f, i) => !f.isEqualNode(i)
  })
}

//Start Router listener
startRouters();
BaseStyles();


//Disable if you are doing changes locally
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(
      registration => {
        console.log(`ServiceWorker registration successful with scope: ${registration.scope}`);
      },
      error => {
        console.log(`ServiceWorker registration failed: ${error}`);
      }
    );
  });
}
