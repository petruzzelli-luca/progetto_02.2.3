import { Routes } from '@angular/router';
import { TypeListComponent } from './components/type-list/type-list';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'types', pathMatch: 'full' },
  { path: 'types', component: TypeListComponent },
  { path: 'types/:typeName', component: PokemonListComponent },
  { path: 'pokemon/:id', component: PokemonDetailComponent }
];