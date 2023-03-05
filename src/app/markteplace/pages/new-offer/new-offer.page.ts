import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ResponseQuote } from '../../model/responseQuote';
import { QuoteResponsesService } from '../../services/quote-responses.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  response: ResponseQuote = {
    authorId: '3',
    requestsId: '4',
    attachments: '3',
  };
  id = '0';
  constructor(
    private navCtrl: NavController,
    private router: ActivatedRoute,
    private responseQuoteService: QuoteResponsesService
  ) {
    this.id = this.router.snapshot.paramMap.get('id');
  }

  ngOnInit() {}

  /* handleStatus(e) {
    this.response.status = e.detail.value;
  } */

  onSubmit() {
    this.response.requestsId = this.id;
    this.responseQuoteService
      .createResponse(this.response)
      .subscribe((data) => {
        this.navCtrl.navigateRoot('/app/tabs/quote', {
          animated: true,
        });
      });
    console.log(JSON.stringify(this.response));
  }
}
