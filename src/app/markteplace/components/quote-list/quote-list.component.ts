import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quote } from '../../model/quote';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss'],
})
export class QuoteListComponent implements OnInit {

  @Input() quotes: Quote[] = [];
  constructor(private router: Router) {
   }

  ngOnInit() {

  }

  selectQuote(id) {
    this.router.navigateByUrl('/quote-response/'+id);
  }


}
