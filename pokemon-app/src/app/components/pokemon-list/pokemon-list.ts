import { Component, OnInit, OnDestroy, DoCheck, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';//
import { takeUntil } from 'rxjs/operators';  // Importa l'operatore takeUntil per gestire la cancellazione degli observable
import { PokemonService } from '../../services/pokemon.service';
import { PokemonSummary } from '../../models/pokemon-type.model';

@Component({
  selector: 'app-pokemon-list',  
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-list.html',
  styleUrls: ['./pokemon-list.css']
})
export class PokemonListComponent implements OnInit, OnDestroy{
  typeName: string = '';
  pokemonList: PokemonSummary[] = [];
  loading: boolean = false;
  private destroy$ = new Subject<void>();
  private lastCheckedLength = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef
  ) {}


    


  ngOnInit(): void {
    this.route.paramMap 
      .pipe(takeUntil(this.destroy$)) //
      .subscribe(params => { // Sottoscrizione ai parametri della route
        const newTypeName = params.get('typeName');
        console.log('📍 Parametro route ricevuto:', newTypeName);
        this.typeName = newTypeName || '';
        this.loadPokemon(); // Carica i Pokémon quando il parametro cambia
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPokemon(): void {
    
    this.loading = true;
    
    this.pokemonService.getTypeDetail(this.typeName).subscribe({
      next: (data) => {
        if (data && data.pokemon) {
          this.pokemonList = data.pokemon.slice(0, 50).map(p => p.pokemon);
        } 
        this.loading = false;
        this.cdr.markForCheck(); // FORZA L'AGGIORNAMENTO DELLA VIEW
      },
      error: (err) => {
        console.error('❌ Errore HTTP:', err);
        this.loading = false;
        this.cdr.markForCheck();
      }
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