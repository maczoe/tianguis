import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NewQuotePage } from '../modals/new-quote/new-quote.page';

@Component({
  selector: 'app-quote',
  templateUrl: 'quote.page.html',
  styleUrls: ['quote.page.scss']
})
export class QuotePage implements OnInit  {

  constructor(private router: Router) { }

  ngOnInit() { }


  newQuote() {
    this.router.navigateByUrl('/new-quote');
  }
}
