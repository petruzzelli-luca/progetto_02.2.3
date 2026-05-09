import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonSummary } from '../../models/pokemon-type.model';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const typeName = this.route.snapshot.paramMap.get('typeName') || '';
    this.typeName = typeName;
    this.loading = true;
    this.pokemonService.getTypeDetail(this.typeName).subscribe({
      next: (data) => {
        if (data && data.pokemon) {
          this.pokemonList = data.pokemon.slice(0, 50).map(p => p.pokemon);
        }
        this.loading = false;
        this.cdr.markForCheck();
      },
      
    });
  }

  selectPokemon(url: string): void {
    const parts = url.split('/').filter(p => p);
    const id = parts[parts.length - 1];
    this.router.navigate(['/pokemon', id]);
  }

  goBack(): void {
    this.router.navigate(['/types']);
  }
}