import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonSummary } from '../../models/pokemon-type.model';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list.html',
  styleUrls: ['./pokemon-list.css']
})
export class PokemonListComponent implements OnInit {
  typeName: string = '';
  pokemonList: PokemonSummary[] = [];
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
        this.pokemonList = data.pokemon.slice(0, 20).map(p => p.pokemon);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  selectPokemon(url: string): void {
    // Estraiamo l'ID dall'URL del pokemon
    const parts = url.split('/').filter(p => p);
    const id = parts[parts.length - 1];
    this.router.navigate(['/pokemon', id]);
  }

  goBack(): void {
    this.router.navigate(['/types']);
  }
}