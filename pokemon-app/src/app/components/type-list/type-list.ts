import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-type-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './type-list.html',
  styleUrls: ['./type-list.css']
})
export class TypeListComponent {
  types: string[] = [];

  constructor(private pokemonService: PokemonService, private router: Router) {
    this.types = this.pokemonService.getSelectedTypes(); // Recupera la lista dei tipi di Pokémon disponibili dal servizio PokemonService
  }

  selectType(typeName: string): void { 
    this.router.navigate(['/types', typeName]); 
  }
}