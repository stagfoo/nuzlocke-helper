import { state, storageKey } from './index';
import page from 'page'
import * as NETWORK from './url'
import * as pokemonNameDB from 'pokemon'
import { Pokemon, State } from 'store';
import * as _ from 'lodash'
const _pokemonNameDB = pokemonNameDB.all('en');

export function handleSavePokemon() {
  state._update('addToCurrentTeam', state.addNewPokemon);
  page('/')
};

export function handleAddPokemon() {
  page('/add-pokemon')
};
export function handleEditPokemon(pokemon:Pokemon) {
  state._update('updateNewPokemon', pokemon);
  const nextState = state.listedPokemon.filter(p => p.id !== pokemon.id);
  state._update('updateListedPokemon', nextState);
  page('/edit-pokemon');
};
export function handleAddGhostPokemon() {
  page('/add-pokemon?inbox=true')
};

export function handleSearch(event) {
  const search = event.target.value;
  state._update('updateSearch', search);
  state._update('updateSearchResults', _pokemonNameDB.filter(p => {
    return p.toLowerCase().includes(search.toLowerCase())
  }));
  if (search.length === 0) {
    state._update('updateSearchResults', []);
  }
};

export function handleSelectedResult(p: string) {
  const pokedexNumber = (pokemonNameDB as any).getId(p);
  NETWORK.getPokemonFromNetwork(pokedexNumber).then(res => {
    state._update('updateNewPokemon', {
      ...state.addNewPokemon,
      img: _.get(res, 'sprites.other["official-artwork"].front_default')
    });
    state._update('updateSearch', "");
    state._update('updateSearchResults', []);
  }).catch(console.log)

}
export function handleLevel(event) {
  state._update('updateNewPokemon', {
    ...state.addNewPokemon,
    lvl: event.target.value
  });
};
export function handleNickname(event) {
  state._update('updateNewPokemon', {
    ...state.addNewPokemon,
    name: event.target.value
  });
};
export function handleGhostClick() {
  state._update('updateNewPokemon', ({
    ...state.addNewPokemon,
    inBox: !state.addNewPokemon.inBox
  }));
};
export function handleBack() {
  page('/')
};

export function removePokemon(id: string) {
  const nextState = state.listedPokemon.filter(p => p.id !== id);
  state._update('updateListedPokemon', nextState);
}

export function saveState(state: State) {
  if (state.listedPokemon.length > 0) {
    localStorage.setItem(storageKey, JSON.stringify(state))
  }
}

export function loadState(key: string = storageKey, defaultState) {
  if (localStorage.getItem(key)) {
    const state = JSON.parse(localStorage.getItem(key))
    return state;
  } else {
    return defaultState
  }
}
