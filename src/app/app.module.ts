import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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
    ExplorerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
