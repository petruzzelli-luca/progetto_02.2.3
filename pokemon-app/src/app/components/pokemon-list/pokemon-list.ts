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
    const typeName = this.route.snapshot.paramMap.get('typeName') || ''; // Recupera il nome del tipo di Pokémon dalla rotta
    this.typeName = typeName;
    this.loading = true; 
    this.pokemonService.getTypeDetail(this.typeName).subscribe({ 
      next: (data) => { 
        this.pokemonList = data.pokemon.map(p => p.pokemon); // Estrae la lista dei Pokémon associati al tipo
        this.loading = false;
        this.cdr.markForCheck(); // Aggiorna la vista dopo aver ricevuto i dati
      },
      
    });
  }

  selectPokemon(url: string): void {
    const parts = url.split('/').filter(p => p); // Divide l'URL in parti e filtra eventuali stringhe vuote
    const id = parts[parts.length - 1]; // Estrae l'ID del Pokémon dall'URL
    this.router.navigate(['/pokemon', id]);
  }

  goBack(): void {
    this.router.navigate(['/types']);
  }
}