import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'firebase/messaging';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';
import { Storage } from '@ionic/storage-angular';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment.mock';
import { Profile } from 'src/app/markteplace/model/profile';
import { Observable, of } from 'rxjs';
import { AlertController, ToastController } from '@ionic/angular';

const urlNoti = environment.urlapi;
const firebaseConfig = environment.firebase;
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  url = urlNoti;
  myProfile: Profile = {};
  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private storage: Storage,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  public async initPush() {
    await this.storage.create();
    this.storage.get('profile').then((profile) => {
      this.myProfile = JSON.parse(profile);

      if (Capacitor.platform !== 'web') {
        this.registerPush();
      } else {
        console.log('Vista Web Push');
        this.registerWebPush();
      }
    });
  }

  registerPush() {
    PushNotifications.requestPermissions()
      .then((result) => {
        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register().catch((error) => {
            console.error('Error registering for push notifications', error);
          });
        } else {
          // Show some error
        }
      })
      .catch((error) => {
        console.error('Error requesting push notifications permissions', error);
      });

    PushNotifications.addListener('registration', async (token: Token) => {
      console.log('Push registration success, token: ' + token.value);
      this.registerDeviceMobile(token.value);
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push received: ' + notification);
        this.showNotification(notification.title, notification.body);
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        const data = notification.notification.data;
        console.log('Push action performed: ' + JSON.stringify(notification));
        if (data.detailsId) {
          this.router.navigateByUrl(`/app/tabs/home`);
        }
      }
    );
  }

  registerWebPush() {}

  async registerDivice(key: any) {
    const info = await Device.getInfo();
    const model = info.model;
    const memUsed = info.memUsed;
    const manufacturer = info.manufacturer;
    const nameMobile = info.name;
    const body = {
      divice: manufacturer + '-' + nameMobile + '-' + model,
      token: key,
      userId: this.myProfile.id,
    };
    console.log(body);

    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `bearer ${this.authService.token}`,
    });

    this.createDevice(body).subscribe(
      (res) => {
        console.log('Res-Noti:', res);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  async registerDeviceMobile(key: any) {
    const info = await Device.getInfo();
    const model = info.model;
    const memUsed = info.memUsed;
    const manufacturer = info.manufacturer;
    const nameMobile = info.name;
    const body = {
      divice: manufacturer + '-' + nameMobile + '-' + memUsed + '-' + model,
      token: key,
      userId: this.myProfile.id,
      model,
    };
    console.log('Body- Noti:', body);

    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `bearer ${this.authService.token}`,
    });

    this.createDevice(body).subscribe(
      (res) => {
        console.log('Res-Noti:', res);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  createDevice(payload): Observable<any> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `bearer ${this.authService.token}`,
    });
    return this.http.post(this.url + 'mobile-divice', payload, { headers });
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Notificación',
      message,
      buttons: ['OK'],
      cssClass: 'top-alert',
    });

    await alert.present();
  }

  async showNotification(title: string, message: string) {
    const toast = await this.toastController.create({
      header: title,
      message,
      position: 'top',
      duration: 3000,
      cssClass: 'top-alert',
      translucent: true,
    });

    toast.present();
  }
}
