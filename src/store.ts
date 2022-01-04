import { reducer } from 'obake.js';

export type Pokemon = {
  img: string,
  name: string,
  lvl: number,
  id: string,
  inBox: boolean;
}

export type State = {
  currentPage: { name: string },
  listedPokemon: Array<Pokemon>,
  searchResults: Array<string>,
  searchBox: string,
  addNewPokemon: Pokemon
}

export const defaultState = {
  currentPage: { name: 'HOME' },
  listedPokemon: [],
  searchResults: [],
  searchBox: "",
  addNewPokemon: {
    id: "",
    name: "",
    lvl: 0,
    img: "",
    inBox: false
  }
}

export const reducers = {
  updateCurrentPage: reducer((state, value: string) => {
    state.currentPage = { name: value };
  }),
  updateNewPokemon: reducer((state, value: Pokemon) => {
    state.addNewPokemon = value
  }),
  updateSearch: reducer((state, value: string) => {
    state.searchBox = value
  }),
  updateSearchResults: reducer((state, value: Array<Pokemon>) => {
    state.searchResults = value
  }),
  addToCurrentTeam: reducer((state, value: Pokemon) => {
    state.listedPokemon = [value, ...state.listedPokemon]
  }),
  updateListedPokemon: reducer((state, value: Array<Pokemon>) => {
    state.listedPokemon = value
  }),
}
