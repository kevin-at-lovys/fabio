import { Injectable } from '@angular/core';
import { Route, Router, ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private pageSubject: BehaviorSubject<string>;;
  public currentPageObservable: Observable<string>;

  private totalPagesSubject: BehaviorSubject<number>;;
  public totalPagesObservable: Observable<number>;

  public total_pages: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.pageSubject = new BehaviorSubject("1");
    this.currentPageObservable = this.pageSubject.asObservable();

    this.totalPagesSubject = new BehaviorSubject(1);
    this.totalPagesObservable = this.totalPagesSubject.asObservable();

    this.activatedRoute.queryParams.subscribe(params => {
      this.pageSubject.next(params['page']);
    });


  }

  go_to_page(page: number) {

    const queryParams: Params = { page: page.toString() };

    this.router.navigate( [],
      {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
        queryParamsHandling: 'merge',
      });
  }

  set_total_pages(total: number) {
    this.totalPagesSubject.next(total);
  }

  get_current_page() {
    return this.pageSubject.value;
  }

  get_total_pages() {
    return this.totalPagesSubject.value;
  }
}
