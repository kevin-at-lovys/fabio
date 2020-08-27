import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './movie/list/list.component';
import { SigninComponent } from './profile/signin/signin.component';
import { SignupComponent } from './profile/signup/signup.component';
import { MovieCardComponent } from './movie/movie-card/movie-card.component';
import { NavbarComponent } from './page/navbar/navbar.component';
import { FooterComponent } from './page/footer/footer.component';
import { ContentComponent } from './page/content/content.component';
import { CategoryCardComponent } from './movie/category-card/category-card.component';
import { ExplorerComponent } from './page/explorer/explorer.component';
import { ProfileComponent } from './page/profile/profile.component';
import { FavoritesComponent } from './page/favorites/favorites.component';
import { CategoryComponent } from './page/category/category.component';

const routes: Routes = [
  { path: 'home', component: ExplorerComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'genre/:id', component: CategoryComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    SigninComponent,
    SignupComponent,
    MovieCardComponent,
    NavbarComponent,
    FooterComponent,
    ContentComponent,
    CategoryCardComponent,
    ExplorerComponent,
    FavoritesComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
