import page from 'page';
import { state } from './index';
import slugid from 'slugid';
// Handlers
const HOME_PAGE = (ctx, next) => {
  state._update('updateCurrentPage', 'HOME')
};
const ADD_POKEMON = (ctx, next) => {
  state._update('updateNewPokemon', {
      id: slugid.nice(),
      name:"",
      lvl: "",
      img:"",
      inBox: ctx.querystring == "inbox=true"
  });
  state._update('updateCurrentPage', 'ADD_POKEMON')
};
const EDIT_POKEMON = (ctx, next) => {
  state._update('updateCurrentPage', 'EDIT_POKEMON')
};
// Routes
page('/', HOME_PAGE);
page('/add-pokemon', ADD_POKEMON);
page('/edit-pokemon', EDIT_POKEMON);


export function startRouters(): void {
  page.start();
}

export function getPokemonFromNetwork(id:number) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((data) => data.json());
}