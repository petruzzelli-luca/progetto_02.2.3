import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list.html',
  styleUrls: ['./pokemon-list.css']
})
export class PokemonListComponent implements OnInit {
  typeName: string = '';
  pokemonList: Pokemon[] = [];
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.typeName = this.route.snapshot.paramMap.get('typeName') || '';
    this.loadPokemon();
  }

  loadPokemon(): void {
    this.loading = true;
    this.pokemonService.getTypeDetail(this.typeName).subscribe({
      next: (data) => {
        // Limitiamo a 20 pokémon per non sovraccaricare
        const summaries = data.pokemon.slice(0, 20).map(p => p.pokemon);
        const urls = summaries.map(s => s.url);
        this.pokemonService.getPokemonByUrls(urls).subscribe({
          next: (pokemons) => {
            this.pokemonList = pokemons;
            this.loading = false;
          },
          error: (err) => {
            console.error('Errore nel caricamento dei Pokémon:', err);
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('Errore nel caricamento del tipo:', err);
        this.loading = false;
      }
    });
  }

  selectPokemon(id: number): void {
    this.router.navigate(['/pokemon', id]);
  }

  goBack(): void {
    this.router.navigate(['/types']);
  }
}