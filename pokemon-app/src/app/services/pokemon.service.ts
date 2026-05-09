import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,  } from 'rxjs';
import { PokemonTypeList, PokemonTypeDetail } from '../models/pokemon-type.model';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2'; // URL base per l'API di PokeAPI

  // Mostreremo solo 7 tipi come richiesto
  private selectedTypes = ['normal', 'ground', 'flying', 'water', 'fire', 'grass', 'electric'];

  constructor(private http: HttpClient) {} //

  getTypes(): Observable<PokemonTypeList> {  // Recupera la lista dei tipi di Pokémon
    return this.http.get<PokemonTypeList>(`${this.baseUrl}/type?limit=20`);
  }

  getSelectedTypes(): string[] {  // Restituisce i tipi selezionati (normal, ground, flying)
    return this.selectedTypes;
  }

  getTypeDetail(name: string): Observable<PokemonTypeDetail> {  // Recupera i dettagli di un tipo specifico, inclusi i Pokémon associati
    return this.http.get<PokemonTypeDetail>(`${this.baseUrl}/type/${name}`);
  }

  getPokemonByUrl(url: string): Observable<Pokemon> {  // Recupera i dettagli di un Pokémon specifico utilizzando l'URL fornito
    return this.http.get<Pokemon>(url);
  }

  getPokemonById(id: string): Observable<Pokemon> {   // Recupera i dettagli di un Pokémon specifico utilizzando il suo ID
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${id}`);
  }

}