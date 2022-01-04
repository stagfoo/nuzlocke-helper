import page from 'page';
import { state } from './index';
import slugid from 'slugid';
// Handlers
const HOME_PAGE = (ctx, next) => {
  state._update('updateCurrentPage', 'HOME')
};
const ADD_POKEMON = (ctx, next) => {
  console.log('ctx', ctx);
  state._update('updateNewPokemon', {
      id: slugid.nice(),
      name:"",
      lvl: "",
      img:"",
      inBox: ctx.querystring == "inbox=true"
  });
  state._update('updateCurrentPage', 'ADD_POKEMON')
};
// Routes
page('/', HOME_PAGE);
page('/add-pokemon', ADD_POKEMON);


export function startRouters(): void {
  page.start();
}

export function getPokemonByName(name:string) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((data) => data.json());
}