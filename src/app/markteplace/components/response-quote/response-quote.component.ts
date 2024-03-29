import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '../../model/profile';
import { ResponseQuote } from '../../model/responseQuote';
import { ProfilesService } from '../../services/profiles.service';

@Component({
  selector: 'app-response-quote',
  templateUrl: './response-quote.component.html',
  styleUrls: ['./response-quote.component.scss'],
})
export class ResponseQuoteComponent implements OnInit {
  @Input() resp: ResponseQuote = {};
  profile: Profile = {};
  constructor(private profilesService: ProfilesService) {}

  ngOnInit() {
    this.profile = this.resp.author;
  }
}
