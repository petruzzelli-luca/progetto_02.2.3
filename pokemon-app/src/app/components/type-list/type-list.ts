import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-type-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './type-list.html',
  styleUrls: ['./type-list.css']
})
export class TypeListComponent {
  types: string[] = [];

  constructor(private pokemonService: PokemonService, private router: Router) {
    this.types = this.pokemonService.getSelectedTypes();
  }

  selectType(typeName: string): void {
    this.router.navigate(['/types', typeName]);
  }
}