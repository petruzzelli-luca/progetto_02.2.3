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

  constructor(private http: HttpClient) {
  }

  getTypes(): Observable<PokemonTypeList> {  // Recupera la lista dei tipi di Pokémon
    return this.http.get<PokemonTypeList>(`${this.baseUrl}/type`); 
  }

  getSelectedTypes(): string[] {   //
    return this.selectedTypes; // Restituisce la lista dei tipi selezionati 
  }

  getTypeDetail(name: string): Observable<PokemonTypeDetail> {  // Recupera i dettagli di un tipo specifico, inclusi i Pokémon associati
    const url = `${this.baseUrl}/type/${name}`;
    return this.http.get<PokemonTypeDetail>(url);
  }

  getPokemonByUrl(url: string): Observable<Pokemon> {  // Recupera i dettagli di un Pokémon specifico utilizzando l'URL fornito
    return this.http.get<Pokemon>(url); // Utilizza l'URL del Pokémon per recuperare i dettagli del Pokémon
  }

  getPokemonById(id: string): Observable<Pokemon> {   // Recupera i dettagli di un Pokémon specifico utilizzando il suo ID
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${id}`); // Utilizza l'ID del Pokémon per costruire l'URL e recuperare i dettagli del Pokémon
  }

}