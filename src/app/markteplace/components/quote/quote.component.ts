import { Component, Input, OnInit } from '@angular/core';
import { Quote } from '../../model/quote';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
})
export class QuoteComponent implements OnInit {
  @Input() quote: Quote;
  ofertas: string;
  constructor() { }

  ngOnInit() {
    if (this.quote.responses.length > 0) {
      if (this.quote.responses.length === 1) {
        this.ofertas = `Tienes ${this.quote.responses.length} oferta`;
      } else {
        this.ofertas = `Tienes ${this.quote.responses.length} ofertas`;
      }
    } else {
      this.ofertas = `A un no tienes ofertas`;
    }
  }

}
