import { Component, Input, OnInit } from '@angular/core';
import { Quote } from '../../model/quote';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss'],
})
export class QuoteListComponent implements OnInit {

  @Input() quotes: Quote[] = [];
  constructor() {
   }

  ngOnInit() {
    console.log(this.quotes);

  }

}
