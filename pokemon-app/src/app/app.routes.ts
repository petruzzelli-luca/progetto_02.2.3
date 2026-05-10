import { Routes } from '@angular/router';
import { TypeListComponent } from './components/type-list/type-list';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail';

export const routes: Routes = [ // Definisce le rotte dell'applicazione
  { path: '', redirectTo: 'types', pathMatch: 'full' }, // Reindirizza la rotta vuota a 'types'
  { path: 'types', component: TypeListComponent }, // Rota per visualizzare la lista dei tipi di Pokémon
  { path: 'types/:typeName', component: PokemonListComponent },
  { path: 'pokemon/:id', component: PokemonDetailComponent }
];