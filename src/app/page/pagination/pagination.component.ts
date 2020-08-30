import { Component, OnInit } from '@angular/core';
import {PaginationService} from './pagination.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  page:number;
  max_pages:number;
  total_pages:number;
  constructor(private route: ActivatedRoute) {

   }

  ngOnInit(): void {
    this.page = +this.route.snapshot.paramMap.get('page');
  }

}
