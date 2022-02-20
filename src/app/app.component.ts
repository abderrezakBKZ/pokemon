import { Pokemondata, OfficialArtwork } from './pokemondata';
import { Component } from '@angular/core';
import axios from 'axios';

interface Pokemon {
  name: string;
  url: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  pokemondata: Pokemondata = {
    abilities: [],
    base_experience: 0,
    forms: [],
    game_indices: [],
    height: 0,
    held_items: [],
    id: 0,
    is_default: false,
    location_area_encounters: '',
    moves: [],
    name: '',
    order: 0,
    past_types: [],
    stats: [],
    types: [],
    weight: 0,
    species: {
      name: '',
      url: '',
    },
    sprites: {
      back_default: '',
      back_female: null,
      back_shiny: '',
      back_shiny_female: null,
      front_default: '',
      front_female: null,
      front_shiny: '',
      front_shiny_female: null,
    },
  };
  pokemons = new Array<Pokemon>();
  show = false;
  name = '';
  baseExperience = 0;
  number = 0;

  pic = '';
  moves: Array<string> = [];
  types: Array<string> = [];
  ngOnInit() {
    this.getAllPokemons();
  }

  async getAllPokemons() {
    const request = await axios.get(
      'https://pokeapi.co/api/v2/pokemon/?limit=150'
    );
    this.pokemons = request.data.results;
    return this.pokemons;
  }

  async showDetails(num: number) {
    const details = await axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`);
    this.moves = [];
    console.log(this.pokemondata);
    this.show = true;
    this.name = details.data.name;
    this.baseExperience = details.data.base_experience;
    this.number = details.data.order;
    this.pic = details.data.sprites.other.dream_world.front_default;
    details.data.moves.map((m: { move: { name: any } }) => {
      if (this.moves.length == 5) {
        return;
      }
      return this.moves.push(m.move.name);
    });

    this.types = [];
    details.data.types.map((type: { type: { name: string } }) => {
      return this.types.push(type.type.name);
    });
  }
}
