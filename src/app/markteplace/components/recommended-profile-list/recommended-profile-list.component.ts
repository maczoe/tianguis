import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../../model/profile';

@Component({
  selector: 'app-recommended-profile-list',
  templateUrl: './recommended-profile-list.component.html',
  styleUrls: ['./recommended-profile-list.component.scss'],
})
export class RecommendedProfileListComponent implements OnInit {
  @Input() profiles: Profile[] = [];
  constructor(private router: Router) { }

  ngOnInit() {}

  viewProfile(id) {
    this.router.navigateByUrl('/detail-profile/'+id);
  }
}
