import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { QuotesService } from '../markteplace/services/quotes.service';
import { NewQuotePage } from '../modals/new-quote/new-quote.page';

@Component({
  selector: 'app-quote',
  templateUrl: 'quote.page.html',
  styleUrls: ['quote.page.scss']
})
export class QuotePage implements OnInit  {
  quotes = [];
  constructor(private router: Router,
              private quotesService: QuotesService,
  ) { }

  ngOnInit() {
    this.quotesService.getQuotes().then((data) => {
      this.quotes.push(data);
    });
   }


  newQuote() {
    this.router.navigateByUrl('/new-quote');
  }
}
