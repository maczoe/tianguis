/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, RangeCustomEvent } from '@ionic/angular';
import { ReviewsService } from 'src/app/markteplace/services/reviews.service';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.page.html',
  styleUrls: ['./review-modal.page.scss'],
})
export class ReviewModalPage implements OnInit {
  content: string = '';
  rating;
  profileId;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private reviewSvc: ReviewsService
  ) {}

  async close() {
    await this.modalController.dismiss();
  }

  async submitReview() {
    const data = {
      content: this.content,
      rating: this.rating ? this.rating : 3,
      profileId: this.profileId,
    };
    console.log(data);

    this.reviewSvc.setReviewsProfile(data).subscribe(async (resp) => {
      if (resp.active) {
        await this.modalController.dismiss({ reviewCreated: true });
      } else {
        await this.modalController.dismiss({ reviewCreated: false });
      }
    });
  }

  onIonChange(ev: Event) {
    this.rating = (ev as RangeCustomEvent).detail.value;
    console.log(this.rating);
  }

  ngOnInit() {
    this.profileId = this.navParams.get('profileId');
  }
}
