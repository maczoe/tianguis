import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseQuote } from 'src/app/markteplace/model/responseQuote';
import { ProfilesService } from 'src/app/markteplace/services/profiles.service';
import { QuoteResponsesService } from 'src/app/markteplace/services/quote-responses.service';
@Component({
  selector: 'app-quote-response',
  templateUrl: './quote-response.page.html',
  styleUrls: ['./quote-response.page.scss'],
})
export class QuoteResponsePage implements OnInit {
  id = '0';
  responses = [];

  constructor(private quoteResponsesService: QuoteResponsesService,
    private router: ActivatedRoute,
    private profilesService: ProfilesService,
  ) {
    this.id = this.router.snapshot.paramMap.get('idQuote');
   }

  ngOnInit() {

    this.quoteResponsesService.getQuoteReponsesRequest(this.id).then((data: ResponseQuote[]) => {
      this.responses.push(...data);
    });

  }

}
