import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
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
  constructor(
    private router: Router,
    private quotesService: QuotesService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
  ) {
    this.getQuote();
    this.user = this.authService.respUser;
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

  getQuoteUser() {
    if(this.user){
      this.user = this.authService.respUser;
    }
    //this.showLoading();
    this.quotesService.getQuoteBgetQuoteByAttachmentyAtt(this.user.profile.id).subscribe((data) => {
      this.quotes =[];
      this.quotes.push(data);
     // this.finishLoading();
    });
  }

  newQuote() {
    this.router.navigateByUrl('/new-quote');
  }
}
