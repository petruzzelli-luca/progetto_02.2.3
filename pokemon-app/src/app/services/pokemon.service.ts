import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonTypeList, PokemonTypeDetail } from '../models/pokemon-type.model';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  // Mostreremo solo 3 tipi come richiesto
  private selectedTypes = ['normal', 'ground', 'flying'];

  constructor(private http: HttpClient) {}

  getTypes(): Observable<PokemonTypeList> {
    return this.http.get<PokemonTypeList>(`${this.baseUrl}/type?limit=20`);
  }

  getSelectedTypes(): string[] {
    return this.selectedTypes;
  }

  getTypeDetail(name: string): Observable<PokemonTypeDetail> {
    return this.http.get<PokemonTypeDetail>(`${this.baseUrl}/type/${name}`);
  }

  getPokemonByUrl(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }

  getPokemonById(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${id}`);
  }
}