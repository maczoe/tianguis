import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product';
import { Profile } from '../../model/profile';
import { ResponseQuote, ResponseStatus } from '../../model/responseQuote';
import { ProductsService } from '../../services/products.service';
import { ProfilesService } from '../../services/profiles.service';
import { QuoteResponsesService } from '../../services/quote-responses.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail-response-quote',
  templateUrl: './detail-response-quote.page.html',
  styleUrls: ['./detail-response-quote.page.scss'],
})
export class DetailResponseQuotePage implements OnInit {
  id = '0';
  responsesDetail: ResponseQuote = {};
  responseStatus = ResponseStatus;

  product: Product = {};
  profile: Profile = {};
  confirAcepted = false;

  constructor(
    private quoteResponsesService: QuoteResponsesService,
    private router: ActivatedRoute,
    private alertController: AlertController,
    private profilesService: ProfilesService,
    private productsService: ProductsService
  ) {
    this.id = this.router.snapshot.paramMap.get('idReponse');
  }

  ngOnInit() {
    this.quoteResponsesService
      .getQuoteReponseById(this.id)
      .subscribe((data) => {
        console.log(data);
        this.responsesDetail = data;
        this.profile = this.responsesDetail.author;
        if (this.responsesDetail.product) {
          this.productsService
            .getProductId(this.responsesDetail.product)
            .subscribe((pro) => {
              this.product = pro;
            });
        }
      });
  }

  getProfile(id) {
    this.profilesService.getProfile(id).subscribe((data) => {
      this.profile = data;
    });
  }

  getProduct(idProduct) {
    this.productsService.getProductId(idProduct).subscribe((data) => {
      this.product = data;
    });
  }

  async acepted(id) {
    const alert = await this.alertController.create({
      header: 'Aceptar Oferta',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.confirAcepted = false;
          },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.confirAcepted = true;
          },
        },
      ],
    });

    await alert.present();

    await alert.onDidDismiss();

    if (this.confirAcepted) {
      this.quoteResponsesService.acceptedReponseQuote(id).subscribe((data) => {
        console.log('data', data);
        this.responsesDetail = data;
      });
    }
  }
}
