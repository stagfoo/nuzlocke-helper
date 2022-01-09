import * as ACTIONS from "./actions";
import html from "nanohtml";
import { Pokemon, State } from "store";

export function AppRoot(state) {
  return html`
    <div id="app">
      <div class="page ${state.currentPage.name}">${routing(state)}</div>
    </div>
  `;
}

export function pokemonCard(pokemon: Pokemon){
  return html`
  <div class="col" >
    <div class="pokemon">
      <img src="${pokemon.img}" />
      <small>${pokemon.name}</small>
      <button class="close circle" onclick=${() => {ACTIONS.handleEditPokemon(pokemon)}} ><span>+</span></button> 
    </div>
    </div>
  `
}

export function searchResults(results: Array<string>){
  return html`<ul>${results.map(r => {
    return html`
    <li class="result-item">
      <button  onclick="${() => ACTIONS.handleSelectedResult(r)}" >${r}</button>
    </li>`
  })}
  </ul>`

}

export function routing(state: State) {
  const team = state.listedPokemon.filter(p => !p.inBox)
  switch (state.currentPage.name) {
    case "HOME":
      return html`
      <div class="current container">
        <div class="grid">
        <div class="col ${team.length >= 6 ? `hide`: ``}" >
          <button class="add circle" onclick=${ACTIONS.handleAddPokemon}>
          <span>+</span>
          </button>
        </div>
        ${state.listedPokemon.map((p: Pokemon) => {
          if(!p.inBox) {
            return pokemonCard(p);
          }
        })}
        </div>
        </div>
        <div class="inbox container">
        <h1>LOST SOULS</h1>
        <div class="grid">
        <div class="col" >
        <button class="add circle" onclick=${ACTIONS.handleAddGhostPokemon}>
        <span>+</span>
        </button>
        </div>
        ${state.listedPokemon.map((p: Pokemon) => {
          if(p.inBox) {
            return pokemonCard(p);
          }
        })}
        </div>
        </div>
      `;
    case "ADD_POKEMON":
      return html`
        <h1>ADD POKEMON</h1>
        <input placeholder="Find that pokemon!" class="search" value=${state.searchBox} type="text" onkeyup=${ACTIONS.handleSearch} />
        ${searchResults(state.searchResults)}
        <img src="${state.addNewPokemon.img ? state.addNewPokemon.img  : "/pokeball.webp"}" />
        <input placeholder="nickname" type="text"  value=${state.addNewPokemon.name} class="name" onkeyup=${ACTIONS.handleNickname} />
        <div class="form">
        <input placeholder="level" type="number" value=${state.addNewPokemon.lvl} class="level" onkeyup=${ACTIONS.handleLevel} />
        <button class="ghost ${state.addNewPokemon.inBox ? "color": "bw"}" onclick=${ACTIONS.handleGhostClick}><img src="/ghost.png" /></button>
        </div>
        <button onclick=${ACTIONS.handleSavePokemon}>Add</button>
        <button onclick=${ACTIONS.handleBack}>cancel</button>
      `;
      case "EDIT_POKEMON":
        return html`
          <h1>ADD POKEMON</h1>
          <input placeholder="Find that pokemon!" class="search" value=${state.searchBox} type="text" onkeyup=${ACTIONS.handleSearch} />
          ${searchResults(state.searchResults)}
          <img src="${state.addNewPokemon.img ? state.addNewPokemon.img  : "/pokeball.webp"}" />
          <input placeholder="nickname" type="text"  value=${state.addNewPokemon.name} class="name" onkeyup=${ACTIONS.handleNickname} />
          <div class="form">
          <input placeholder="level" type="number" value=${state.addNewPokemon.lvl} class="level" onkeyup=${ACTIONS.handleLevel} />
          <button class="ghost ${state.addNewPokemon.inBox ? "color": "bw"}" onclick=${ACTIONS.handleGhostClick}><img src="/ghost.png" /></button>
          </div>
          <button onclick=${ACTIONS.handleSavePokemon}>Save</button>
          <button class="delete" onclick=${ACTIONS.handleBack}>Delete</button>
        `;
    default:
      return html` <h1>404 CHUM</h1> `;
  }
}