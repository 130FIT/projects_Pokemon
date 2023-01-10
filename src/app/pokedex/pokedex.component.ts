import { Component, OnInit } from '@angular/core';
import { Pokedex } from '../interface/pokemon'
import { HttpClient } from '@angular/common/http';
import { count } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  pokedex: any;
  pokemon: any;
  pokemon_type: any;
  pokemon_name: any;
  pokemon_stats: any
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.getPokedex();
    this.pokedex
  }
  getPokedex() {
    let req: any = {
      method: 'GET',
      body: {},
    };
    this.http.get('https://pokeapi.co/api/v2/pokemon', req).subscribe(data => {
      this.pokedex = Object(data).results;
      let x = 0;
      // แปลง url เป็น urlที่link ไปยังรูปภาพ
      for (let i of this.pokedex) {
        let poke_id = i.url.slice(34).replace('/', '')
        let poke_id_pad = poke_id.padStart(3, 0)
        let poke_imag = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + poke_id_pad + ".png"
        this.pokedex[x]['image'] = poke_imag
        this.pokedex[x]['id'] = poke_id
        x += 1
      }
      console.log(this.pokedex);
    });
  }
  async clear_data() {
    this.pokemon_type = null
  }
  get_ability(id: string) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + id
    this.http.get(url).subscribe(data => {
      console.log(data);
      this.pokemon = Object(data)
      this.pokemon_type = Object(data).types
      this.pokemon_name = Object(data).name
      this.pokemon_stats = Object(data).stats
    })
  }
  getColor(name: string) {
    if (name == "grass")
      return 'RGBA(0,255,0,0.7)';
    else if (name == "poison")
      return 'RGBA(255,0,255,0.6)'
    else if (name == "fire")
      return 'RGBA(255,0,0,0.8)'
    else if (name == "flying")
      return 'RGBA(255,0,255,0.2)'
    else if (name == "water")
      return 'RGBA(0,0,255,0.4)'
    else if (name == "bug")
      return 'RGBA(156, 207, 84, 1)'
    else
      return "RGBA(169, 168, 121)"
  }
  getWidth(v: string) {
    let value = (Number(v) / this.getbasestats(this.pokemon_stats))*100
    return value + "%"
  }
  getbasestats(pokemon_stats: any) {
    let base = Number(pokemon_stats[0].base_stat) + Number(pokemon_stats[1].base_stat) + Number(pokemon_stats[2].base_stat) + Number(pokemon_stats[3].base_stat) + Number(pokemon_stats[4].base_stat) + Number(pokemon_stats[5].base_stat)
    // console.log(base);
    return base
  }
}
