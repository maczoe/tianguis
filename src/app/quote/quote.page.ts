import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonRefresher,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { QuotesService } from '../markteplace/services/quotes.service';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-quote',
  templateUrl: 'quote.page.html',
  styleUrls: ['quote.page.scss'],
})
export class QuotePage implements OnInit {
  user;
  quotes = [];
  myquotes = [];
  refresher: IonRefresher;
  isAuth = false;

  type = 'quotes';

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
    this.quotesService.getQuotes().subscribe((data) => {
      this.quotes = [];
      this.quotes.push(data.quotes);
    });
  }

  async getMyQuote() {
    this.quotesService.getMyQuotes().subscribe((data) => {
      this.myquotes = [];
      this.myquotes.push(data.quotes);
    });
  }

  myQuotes() {
    if (this.myquotes.length === 0) {
      this.getMyQuote();
    }
  }

  segmentChanged($event) {}

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
      console.log(data.quotes);
      this.quotes = data.quotes;
      this.refresher.complete();
    });
  }

  async handleRefresh(event) {
    await  this.getQuote();
    await  this.getMyQuote();
    event.target.complete();
  }
}
