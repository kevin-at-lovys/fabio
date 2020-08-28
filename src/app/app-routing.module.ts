import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExplorerComponent } from './page/explorer/explorer.component';
import { ProfileComponent } from './page/profile/profile.component';
import { CategoryComponent } from './page/category/category.component';
import { SigninComponent } from './profile/signin/signin.component';
import { FavoritesComponent } from './page/favorites/favorites.component';
import { SignupComponent } from './profile/signup/signup.component';

const routes: Routes =  [
  { path: 'home', component: ExplorerComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'genre/:name', component: CategoryComponent },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
