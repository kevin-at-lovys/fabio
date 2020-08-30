import { Component, OnInit, Input } from '@angular/core';
import { PaginationService } from './pagination.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  max_pages: number;
  page = 1;
  _pages: number[] = [];
  pages: number[] = [];

  @Input() number_of_pages_to_show = 5;

  constructor(private route: ActivatedRoute,
    private paginationService: PaginationService) {

  }

  ngOnInit(): void {
    this.page = +this.paginationService.get_current_page();
    this.update_pages();

    this.paginationService.currentPageObservable.subscribe({
      next: (page) => {
        this.page = +page;
        this.update_pages();
      }
    });

  }
  update_pages() {
    if (this.number_of_pages_to_show <= 5) {
      this.number_of_pages_to_show = 5
    }
    this.max_pages = this.paginationService.get_total_pages();
    let half = Math.floor(this.number_of_pages_to_show / 2);
    let current = +this.page;
    let start = 1;

    let end = start + this.number_of_pages_to_show-1;
    
    if (current + half  > end)
      end = current + half

    if (current > start + half) {
      start = current - half
    }
    if (end > this.max_pages) {
      end = this.max_pages
    }

    this._pages = [];

    for (let i = start; i <= end; i++) {
      this._pages.push(i);
    }
  }

  go_to(page) {
    let p = + page;
    if (p > 0 && p < this.max_pages)
      this.paginationService.go_to_page(page)
  }

}
