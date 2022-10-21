import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../../model/profile';
import { ProductsService } from '../../services/products.service';
import { ProfilesService } from '../../services/profiles.service';

@Component({
  selector: 'app-detail-profile',
  templateUrl: './detail-profile.page.html',
  styleUrls: ['./detail-profile.page.scss'],
})
export class DetailProfilePage implements OnInit {
  profileId = '0';
  profile: Profile = {};
  products= [];
  type = 'vewProduct';
  constructor(
    private router: ActivatedRoute,
    private routerPath: Router,
    private profilesService: ProfilesService,
    private productsService: ProductsService
  ) {
    this.profileId = this.router.snapshot.paramMap.get('idProfile');
    this.getProfile(this.profileId);
    this.getProductsProfile(this.profileId);
  }

  ngOnInit() {

  }

  getProfile(id) {
    this.profilesService.getProfile(id).then((data) => {
      this.profile = data;

    });
  }
  getProductsProfile(id) {
    this.productsService.getProductsProfile(id).then((data) => {
      this.products.push(data);
      console.log(this.products[0]);

    });
  }

  segmentChanged($event) {
  }
  eventFavorite(favorite) {
    this.profile.favorite=favorite;
  }

  sendMessage(profileId) {
    this.routerPath.navigateByUrl('/chat-list/'+profileId);
  }
}
