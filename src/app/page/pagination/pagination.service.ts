import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private page;
  private pageObserver;

  constructor(private router: Router) {
    console.log(this.router.url)
  }
  go_to_page(page: number) {
    this.router.url
  }
}
