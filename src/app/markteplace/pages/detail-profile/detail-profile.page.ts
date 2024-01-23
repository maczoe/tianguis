import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../../model/profile';
import { ProfilesService } from '../../services/profiles.service';
import { ModalController, NavController } from '@ionic/angular';
import { ReviewModalPage } from 'src/app/modals/review-modal/review-modal.page';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FavoriteProfileService } from '../../services/favorite-profile.service';
import { Storage } from '@ionic/storage-angular';

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
  user;
  isProfile = false;
  isAuth = false;

  isFavorite = false;

  productsFavorite = [];
  profilesFavorite = [];

  constructor(
    private router: ActivatedRoute,
    private routerPath: Router,
    private profilesService: ProfilesService,
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private storage: Storage,
    private favProfileSvc: FavoriteProfileService
  ) {
    this.profileId = this.router.snapshot.paramMap.get('idProfile');
    this.getProfile(this.profileId);
    this.user = this.authService.respUser;
  }

  async ngOnInit() {
    this.authService.validateAuth().then((isAuth) => {
      this.isAuth = isAuth;
    });
  }

   getProfile(id) {
    this.profilesService.getProfile(id).subscribe(async (data) => {
      this.productsFavorite = JSON.parse(
        await this.storage.get('productsFavorite')
      );
      this.profilesFavorite = JSON.parse(
        await this.storage.get('profilesFavorite')
      );
      console.log(this.profilesFavorite);
      this.profile = data;
      this.isProfile = this.profile.id === this.user.profile.id;
      this.products.push(this.profile.products);
      this.reviews = this.profile.reviews;
      this.isProfileFavorite(this.profile);
    });
  }
  async openReviewModal(profileId: number) {
    const modal = await this.modalController.create({
      component: ReviewModalPage,
      componentProps: {
        profileId,
      },
    });

    modal.onDidDismiss().then((data) => {
      if (data.data && data.data.reviewCreated === true) {
        this.getProfile(profileId);
      } else {
        console.log('Error al agregar reseña');
      }
    });

    return await modal.present();
  }

  segmentChanged($event) {}
  eventFavorite(favorite) {
    if (favorite) {
      this.isFavorite = favorite;
      this.favProfileSvc
        .addFavoriteProfile(this.profile.id)
        .subscribe((data) => {
          console.log(data);
        });
    } else {
      this.isFavorite = favorite;
      this.favProfileSvc
        .removeFavoriteProfile(this.profile.id)
        .subscribe((data) => {
          console.log(data);
        });
    }
  }

  sendMessage(profileId) {
    this.routerPath.navigateByUrl('/chat-list/' + profileId);
  }

  goLogin() {
    this.navCtrl.navigateRoot('/login', { animated: true });
  }

  isProfileFavorite(profile: Profile) {
    this.isFavorite = this.profilesFavorite.some(
      (favoriteProfile) => favoriteProfile.profile.id === profile.id
    );
    console.log(this.isFavorite);
  }
}
