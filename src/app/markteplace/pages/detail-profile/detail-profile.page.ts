import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../../model/profile';
import { ProfilesService } from '../../services/profiles.service';
import { ModalController, NavController } from '@ionic/angular';
import { ReviewModalPage } from 'src/app/modals/review-modal/review-modal.page';
import { AuthService } from 'src/app/auth/services/auth.service';

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

  constructor(
    private router: ActivatedRoute,
    private routerPath: Router,
    private profilesService: ProfilesService,
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController

  ) {
    this.profileId = this.router.snapshot.paramMap.get('idProfile');
    this.getProfile(this.profileId);
    this.user = this.authService.respUser;
  }

  ngOnInit() {
    this.authService.validateAuth().then((isAuth) => {
      this.isAuth = isAuth;
    });
  }

  getProfile(id) {
    this.profilesService.getProfile(id).subscribe((data) => {
      this.profile = data;
      this.isProfile = this.profile.id === this.user.profile.id;
      this.products.push(this.profile.products);
      this.reviews = this.profile.reviews;
      console.log(this.reviews);
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
    this.profile.favorite = favorite;
  }

  sendMessage(profileId) {
    this.routerPath.navigateByUrl('/chat-list/' + profileId);
  }

  goLogin() {
    this.navCtrl.navigateRoot('/login', { animated: true });
  }
}
