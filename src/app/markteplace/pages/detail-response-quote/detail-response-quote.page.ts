import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product';
import { Profile } from '../../model/profile';
import { ResponseQuote } from '../../model/responseQuote';
import { ProductsService } from '../../services/products.service';
import { ProfilesService } from '../../services/profiles.service';
import { QuoteResponsesService } from '../../services/quote-responses.service';

@Component({
  selector: 'app-detail-response-quote',
  templateUrl: './detail-response-quote.page.html',
  styleUrls: ['./detail-response-quote.page.scss'],
})
export class DetailResponseQuotePage implements OnInit {
  id = '0';
  responsesDetail: ResponseQuote = {};
  product: Product = {};
  profile: Profile = {};

  constructor(private quoteResponsesService: QuoteResponsesService,
            private router: ActivatedRoute,
            private profilesService: ProfilesService,
            private productsService: ProductsService,

  ) {
    this.id = this.router.snapshot.paramMap.get('idReponse');
  }

  ngOnInit() {
    this.quoteResponsesService.getQuoteReponseById(this.id).then((data) => {
      this.responsesDetail = data;
      console.log(this.responsesDetail);
      this.getProfile(this.responsesDetail.author);
      this.getProduct(this.responsesDetail.product);
    });
  }


  getProfile(id) {
    this.profilesService.getProfile(id).subscribe((data) => {
      this.profile = data;
      console.log(this.profile);
    });
  }

  getProduct(idProduct ) {

    this.productsService.getProductId(idProduct).subscribe((data) => {
      this.product = data;
      console.log(this.product);
    });
  }
}
