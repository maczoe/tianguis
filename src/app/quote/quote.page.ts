import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { QuotesService } from '../markteplace/services/quotes.service';
import { NewQuotePage } from '../modals/new-quote/new-quote.page';

@Component({
  selector: 'app-quote',
  templateUrl: 'quote.page.html',
  styleUrls: ['quote.page.scss'],
})
export class QuotePage implements OnInit {
  quotes = [];
  constructor(
    private router: Router,
    private quotesService: QuotesService,
    private loadingCtrl: LoadingController
  ) {
    this.getQuote();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Obteniendo datos..',
      //duration: 3000,
    });

    loading.present();
  }

  async finishLoading() {
    return await this.loadingCtrl.dismiss();
}

  ngOnInit() {}

  getQuote() {
    //this.showLoading();
    this.quotesService.getQuotes().subscribe((data) => {
      this.quotes.push(data);
     // this.finishLoading();
    });
  }

  newQuote() {
    this.router.navigateByUrl('/new-quote');
  }
}
