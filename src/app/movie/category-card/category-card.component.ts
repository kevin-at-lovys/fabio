import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {

  @Input() category: any;
  backgroundColor: string

  constructor(private _elmRef: ElementRef) {
  }

  ngOnInit(): void {
    this._elmRef.nativeElement.querySelector(".card").style.backgroundColor = this.generate_random_color();
  }
  generate_random_color() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
