import { Component, Input, OnInit } from '@angular/core';
import { Quote } from '../../model/quote';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
})
export class QuoteComponent implements OnInit {
  @Input() quote: Quote;
  user;
  ofertas: string;
  color: string;
  constructor(private authService: AuthService) {
    this.user = this.authService.respUser;
  }

  ngOnInit() {
    const hasResponses = this.quote.responses.length > 0;
    const isAuthor = this.quote.author === this.user.profile.id;

    if (hasResponses) {
      this.color = isAuthor ? 'success' : 'light';
      this.ofertas = `Tienes ${this.quote.responses.length} oferta${
        this.quote.responses.length === 1 ? '' : 's'
      }`;
    } else {
      this.color = isAuthor ? 'danger' : 'light';
      this.ofertas = isAuthor ? 'No tienes ofertas' : 'No tiene ofertas';
    }
  }
}
