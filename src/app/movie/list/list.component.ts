import { Component, OnInit, Input } from '@angular/core';
import { MovieDto } from 'src/app/models/movie-dto';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() movies : MovieDto[];
  constructor() { }

  ngOnInit(): void {
  }

}
