import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../../model/profile';
import { ProductsService } from '../../services/products.service';
import { ProfilesService } from '../../services/profiles.service';
import { Review } from '../../model/review';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'app-detail-profile',
  templateUrl: './detail-profile.page.html',
  styleUrls: ['./detail-profile.page.scss'],
})
export class DetailProfilePage implements OnInit {
  profileId = '0';
  profile: Profile = {};
  products = [];
  reviews = [];
  type = 'vewProduct';
  constructor(
    private router: ActivatedRoute,
    private routerPath: Router,
    private profilesService: ProfilesService,
    private reviewSvc: ReviewsService
  ) {
    this.profileId = this.router.snapshot.paramMap.get('idProfile');
    this.getProfile(this.profileId);
  }

  ngOnInit() {}

  getProfile(id) {
    this.profilesService.getProfile(id).subscribe((data) => {
      this.profile = data;

      this.products.push(this.profile.products);
      this.reviews = this.profile.reviews;
      console.log(this.reviews);

    });
  }

  segmentChanged($event) {}
  eventFavorite(favorite) {
    this.profile.favorite = favorite;
  }

  sendMessage(profileId) {
    this.routerPath.navigateByUrl('/chat-list/' + profileId);
  }
}
