import { Component, Input, OnInit } from '@angular/core';
import { ResponseQuote } from '../../model/responseQuote';

@Component({
  selector: 'app-response-quote-list',
  templateUrl: './response-quote-list.component.html',
  styleUrls: ['./response-quote-list.component.scss'],
})
export class ResponseQuoteListComponent implements OnInit {
    @Input() responseQuotes: ResponseQuote[]=[];
  constructor() { }

  ngOnInit() {}

}
