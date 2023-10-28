import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonRefresher,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { QuotesService } from '../markteplace/services/quotes.service';
import { NewQuotePage } from '../modals/new-quote/new-quote.page';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-quote',
  templateUrl: 'quote.page.html',
  styleUrls: ['quote.page.scss'],
})
export class QuotePage implements OnInit {
  user;
  quotes = [];
  refresher: IonRefresher;
  isAuth = false;

  constructor(
    private router: Router,
    private quotesService: QuotesService,
    private loadingCtrl: LoadingController,
    private authService: AuthService
  ) {}

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Obteniendo datos..',
      //duration: 3000,
    });
    this.isAuth = await this.authService.validateAuth();

    loading.present();
  }

  async finishLoading() {
    return await this.loadingCtrl.dismiss();
  }

  async ngOnInit() {
    this.quotesService.onQuoteUpdate().subscribe(() => {
      this.showLoading();
      setTimeout(() => {
        this.getQuote();
        this.finishLoading();
      }, 500);
    });
    this.isAuth = await this.authService.validateAuth();
    if (this.isAuth) {
      this.getQuote();
      this.user = this.authService.respUser;
    }
  }

  async getQuote() {
    //this.showLoading();
    this.quotesService.getQuotes().subscribe((data) => {
      this.quotes = [];
      this.quotes.push(data);
      // this.finishLoading();
    });
  }

  getQuoteUser() {
    if (this.user) {
      this.user = this.authService.respUser;
    }
    //this.showLoading();
    this.quotesService
      .getQuoteBgetQuoteByAttachmentyAtt(this.user.profile.id)
      .subscribe((data) => {
        this.quotes = [];
        this.quotes.push(data);
        // this.finishLoading();
      });
  }

  newQuote() {
    this.router.navigateByUrl('/new-quote');
  }
  onRefresh() {
    this.quotesService.getQuotes().subscribe((data) => {
      this.quotes = data;
      this.refresher.complete();
    });
  }

  handleRefresh(event) {
    this.quotesService.getQuotes().subscribe((data) => {
      this.quotes = [];
      this.quotes.push(data);
      event.target.complete();
    });
  }
}
