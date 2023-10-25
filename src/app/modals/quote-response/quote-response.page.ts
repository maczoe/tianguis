import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quote } from 'src/app/markteplace/model/quote';
import { ResponseQuote } from 'src/app/markteplace/model/responseQuote';
import { ProfilesService } from 'src/app/markteplace/services/profiles.service';
import { QuoteResponsesService } from 'src/app/markteplace/services/quote-responses.service';
import { QuotesService } from 'src/app/markteplace/services/quotes.service';
@Component({
  selector: 'app-quote-response',
  templateUrl: './quote-response.page.html',
  styleUrls: ['./quote-response.page.scss'],
})
export class QuoteResponsePage implements OnInit {
  id = '0';
  responses: ResponseQuote[] = [];
  quote: Quote = {};

  constructor(
    private quoteResponsesService: QuoteResponsesService,
    private router: ActivatedRoute,
    private quotesService: QuotesService,
    private routerPath: Router
  ) {
    this.id = this.router.snapshot.paramMap.get('idQuote');
  }

  ngOnInit() {
    this.quoteResponsesService
      .getQuoteReponsesRequest(this.id)
      .subscribe((data: ResponseQuote[]) => {
        this.responses.push(...data);
        console.log(this.responses);
      });

    this.quotesService.getQuoteById(this.id).subscribe((data: Quote) => {
      this.quote = data;
    });
  }

  sendOffer() {
    this.routerPath.navigateByUrl('/new-offer/' + this.quote.id);
  }

}
