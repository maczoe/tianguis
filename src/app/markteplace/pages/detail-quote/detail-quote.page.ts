import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotesService } from '../../services/quotes.service';
import { Quote } from '../../model/quote';
import { ResponseQuote } from '../../model/responseQuote';

@Component({
  selector: 'app-detail-quote',
  templateUrl: './detail-quote.page.html',
  styleUrls: ['./detail-quote.page.scss'],
})
export class DetailQuotePage implements OnInit {
  idQuote = '0';
  quote: Quote = {};
  ofertas: string;
  lisOfertas: ResponseQuote[] = [];
  constructor(
    private router: ActivatedRoute,
    private quoteSvc: QuotesService,
    private routerPath: Router,
  ) {
    this.idQuote = this.router.snapshot.paramMap.get('idQuote');
  }

  ngOnInit() {
    this.quoteSvc.getQuoteById(this.idQuote).subscribe((data) => {
      this.quote = data;
      this.lisOfertas = this.quote.responses;
      console.log(this.quote);
      if (this.lisOfertas.length > 0) {
        if (this.lisOfertas.length === 1) {
          this.ofertas = `Tienes ${this.lisOfertas.length} oferta`;
        } else {
          this.ofertas = `Tienes ${this.lisOfertas.length} ofertas`;
        }
      } else {
        this.ofertas = `A un no tienes ofertas`;
      }
    });
  }

  selectQuote(id) {
    this.routerPath.navigateByUrl('/quote-response/' + id);
  }

  sendOffer(id) {
    this.routerPath.navigateByUrl('/new-offer/'+id);
  }
}
