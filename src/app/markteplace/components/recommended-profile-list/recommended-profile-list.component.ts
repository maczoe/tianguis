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
  @Input() profilesFavorite = [];
  constructor() {}

  ngOnInit() {}

  isProfileFavorite(profile: Profile): boolean {
    return this.profilesFavorite.some((favoriteProfile) => favoriteProfile.profile.id === profile.id);
  }
}
