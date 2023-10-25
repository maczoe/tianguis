import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotesService } from '../../services/quotes.service';
import { Quote } from '../../model/quote';
import { ResponseQuote } from '../../model/responseQuote';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AlertController } from '@ionic/angular';

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

  user;
  color: string;

  hasResponses = false;
  isAuthor = false;
  constructor(
    private router: ActivatedRoute,
    private alertController: AlertController,
    private quoteSvc: QuotesService,
    private routerPath: Router,
    private authService: AuthService
  ) {
    this.idQuote = this.router.snapshot.paramMap.get('idQuote');
    this.user = this.authService.respUser;
  }

  ngOnInit() {
    this.quoteSvc.getQuoteById(this.idQuote).subscribe((data) => {
      this.quote = data;
      this.lisOfertas = this.quote.responses;
      this.messageOfert();
    });
  }

  selectQuote(id) {
    this.routerPath.navigateByUrl('/quote-response/' + id);
  }

  async cancelQuote(id) {
    const alert = await this.alertController.create({
      header: 'Cancelar esta cotizacion.',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.quoteSvc.cancelQuoteById(id).subscribe((response: boolean) => {
              if (response) {
                this.routerPath.navigateByUrl('/app/tabs/quote');

                this.quoteSvc.notifyQuoteUpdate();
              } else {
                console.log('Error cancelar');
              }
            });
          },
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
  sendOffer(id) {
    this.routerPath.navigateByUrl('/new-offer/' + id);
  }

  messageOfert() {
    this.hasResponses = this.quote.responses.length > 0;
    this.isAuthor = this.quote.author === this.user.profile.id;

    if (this.hasResponses) {
      this.color = this.isAuthor ? 'success' : 'light';
      this.ofertas = `Tiene${this.isAuthor ? 's' : ''} ${
        this.quote.responses.length
      } oferta${this.quote.responses.length === 1 ? '' : 's'}`;
    } else {
      this.color = this.isAuthor ? 'danger' : 'light';
      this.ofertas = this.isAuthor ? 'No tienes ofertas' : 'No tiene ofertas';
    }
  }
}
