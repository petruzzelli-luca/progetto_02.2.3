import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import { ChangeDetectorRef } from '@angular/core'; // Importa ChangeDetectorRef per forzare l'aggiornamento della view
@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail.html',
  styleUrls: ['./pokemon-detail.css']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon | null = null;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';  // Ottiene l'ID del Pokémon dai parametri della route
    this.loading = true;
    this.pokemonService.getPokemonById(id).subscribe({  // Recupera i dettagli del Pokémon utilizzando il suo ID
      next: (data) => {  //
        this.pokemon = data;
        this.loading = false;
        this.cdr.markForCheck(); // FORZA L'AGGIORNAMENTO DELLA VIEW
      },
      
    });
  }

  
  goBack(): void {
    this.router.navigate(['/types']);
  }
}