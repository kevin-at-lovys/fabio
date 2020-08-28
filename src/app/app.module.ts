import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './profile/signin/signin.component';
import { SignupComponent } from './profile/signup/signup.component';
import { MovieCardComponent } from './movie/movie-card/movie-card.component';
import { NavbarComponent } from './page/navbar/navbar.component';
import { FooterComponent } from './page/footer/footer.component';
import { CategoryCardComponent } from './movie/category-card/category-card.component';
import { ExplorerComponent } from './page/explorer/explorer.component';
import { ProfileComponent } from './page/profile/profile.component';
import { FavoritesComponent } from './page/favorites/favorites.component';
import { CategoryComponent } from './page/category/category.component';
import { PaginationComponent } from './page/pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    MovieCardComponent,
    NavbarComponent,
    FooterComponent,
    CategoryCardComponent,
    ExplorerComponent,
    FavoritesComponent,
    CategoryComponent,
    PaginationComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
