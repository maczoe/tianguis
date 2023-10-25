import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Category } from 'src/app/markteplace/model/category';
import { Quote } from 'src/app/markteplace/model/quote';
import { CategoriesService } from 'src/app/markteplace/services/categories.service';
import { QuotesService } from 'src/app/markteplace/services/quotes.service';

@Component({
  selector: 'app-new-quote',
  templateUrl: './new-quote.page.html',
  styleUrls: ['./new-quote.page.scss'],
})
export class NewQuotePage implements OnInit {
  user;
  categories: Category[] = [];
  categoriesSelect = [];
  quote: Quote = {
    locationId: 2,
    attachmentId: 2,
    author: 2,
  };
  constructor(
    private categoriesService: CategoriesService,
    private quoteService: QuotesService,
    private navCtrl: NavController,
    private authService: AuthService
  ) {
    this.user = this.authService.respUser;
  }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  handleChange(ev) {
    const cat: Category[] = ev.target.value;
    const catIds: number[] = [];
    cat.forEach((c) => {
      catIds.push(c.id);
    });
    this.quote.categoriesIds = catIds;
    this.categoriesSelect = ev.target.value;
  }

  handleStatus(e) {
    this.quote.status = e.detail.value;
  }
  handleType(e) {
    this.quote.type = e.detail.value;
  }
  onSubmit() {
    this.quote.attachmentId= this.user.profile.id;
    this.quote.author= this.user.profile.id;
    this.quote.locationId= this.user.profile.id;
    this.quoteService.createQuote(this.quote).subscribe((data) => {
      this.navCtrl.navigateRoot('/app/tabs/quote', { animated: true });
    });
  }
}
