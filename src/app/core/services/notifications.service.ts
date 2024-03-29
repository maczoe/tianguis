import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { environment } from 'src/environments/environment.mock';
const urlNoti = environment.urlapiNoti + '/divice-movil';
const keyFire = environment.privateKeyFirebase;
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  url = urlNoti;
  constructor(private router: Router, private http: HTTP) {}

  public initPush() {
    if (Capacitor.platform !== 'web') {
      this.registerPush();
    } else {
      console.log('Vista Web Push');
      this.registerWebPush();
    }
  }
  registerPush() {
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register().catch((error) => {
          console.error('Error registering for push notifications', error);
        });
      } else {
        // Show some error
      }
    }).catch((error) => {
      console.error('Error requesting push notifications permissions', error);
    });

    PushNotifications.addListener('registration', (token: Token) => {
      console.log('Push registration success, token: ' + token.value);
      this.registerDivice(token.value);
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

  registerWebPush() {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');

          // Register the service worker
          navigator.serviceWorker.ready
            .then((registration) => {
              registration.pushManager
                .subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: keyFire, // Reemplazar con tu clave pública de Firebase
                })
                .then((subscription) => {
                  console.log('Web Push registration success', subscription);
                  const token = subscription.endpoint;
                  this.registerDeviceWeb(token);
                })
                .catch((error) => {
                  console.error('Web Push registration error', error);
                  // Aquí puedes mostrar un mensaje al usuario
                });
            })
            .catch((error) => {
              console.error('Service Worker registration error', error);
              // Aquí puedes mostrar un mensaje al usuario
            });
        }
      });
    }
  }

  async registerDivice(key: any) {
    const info = await Device.getInfo();
    const model = info.model;
    const manufacturer = info.manufacturer;
    const user = info.name;
    const body = {
      divice: manufacturer,
      token: key,
      user,
      model,
    };
    console.log(body);

    this.http
      .post(this.url, body, {})
      .then((data) => {
        console.log(data.status);
        console.log('response:', JSON.parse(data.data)); // data received by server
        console.log(data.headers);
      })
      .catch((error) => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
    /* this.http.post<any>(this.url, body).subscribe((res) => {
      console.log(res);
    }); */
  }

  async registerDeviceWeb(key: any) {
    const info = await Device.getInfo();
    const model = info.model;
    const manufacturer = info.manufacturer;
    const user = info.name;
    const body = {
      divice: manufacturer,
      token: key,
      user,
      model,
    };
    console.log(body);

    //this.http.post(this.url, body, {})
  }
}
