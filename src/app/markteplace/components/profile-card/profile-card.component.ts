import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '../../model/profile';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {
  @Input() profile: Profile={};

  constructor() { }

  ngOnInit() {}

}
