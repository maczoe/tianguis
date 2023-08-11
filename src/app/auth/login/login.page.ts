import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoadingController,
  NavController,
  Platform,
} from '@ionic/angular';

import {v4 as uuidv4} from 'uuid';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { UiAlertsService } from 'src/app/core/services/ui-alerts.service';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage-angular';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { RegisterProfile } from 'src/app/markteplace/model/profile';
import { ProfilesService } from 'src/app/markteplace/services/profiles.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = {
    email: '',
    password: '',
  };
  userLMethod = {
    email: '',
    name: '',
    imageUrl: '',
  };
  loading: any;
  validationFormUser: FormGroup;
  validationUserMessage = {
    email: [
      { type: 'required', message: 'Por favor ingresa tu correo electrónico' },
      {
        type: 'pattern',
        message:
          'Por favor, el correo electrónico ingresado es incorrecto. Intentar otra vez..',
      },
    ],
    password: [
      { type: 'required', message: 'Por favor ingresa tu contraseña' },
      {
        type: 'minlength',
        message: 'La contraseña debe tener al menos  6 caracteres',
      },
    ],
  };
  constructor(
    private router: Router,
    private navCtrl: NavController,
    public formbuider: FormBuilder,
    private uiAlerts: UiAlertsService,
    private authService: AuthService,
    private storage: Storage,
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private profileService: ProfilesService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      GoogleAuth.initialize({
        clientId:
          '426633935974-63tc30cbqp0elpodm40c7i4ouf7b3h90.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        grantOfflineAccess: true,
      });
    });
  }
  async ngOnInit() {
    this.validationFormUser = this.formbuider.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
    });

    await this.storage.create();
  }

  login(value) {
    if (this.user.email === '' || this.user.password === '') {
      //mostrar alerta de usuario incorrecto
      this.uiAlerts.alertaInfo('Todos los campos deben estar completos.');
    } else {
      this.authService.login(this.user).subscribe(
        (data) => {
          console.log(data);
          this.authService.saveToken(data.access_token);
          this.navCtrl.navigateRoot('/app', { animated: true });
        },
        (err) => {
          console.log(err);
          this.uiAlerts.alertaInfo('Usario y contraseña son incorrectos.');
        }
      );
    }
  }
  async googleAuth() {
    //this.router.navigateByUrl('/google-sesion');
    try {
      const googleUser = await GoogleAuth.signIn();
      console.log('signIn:', googleUser);
      const loading = await this.loadingCtrl.create({
        message: 'Registrando...',
      });
      this.userLMethod.email=googleUser.email;
      this.userLMethod.name=googleUser.name;
      this.userLMethod.imageUrl=googleUser.imageUrl;

      this.authService.getByEmail(this.userLMethod.email).subscribe((us) => {
        if (us) {
          loading.dismiss();
          console.log('Login US:', us);
        }else{
          const profile: RegisterProfile = {
            name: this.userLMethod.name,
            publicEmail: this.userLMethod.email,
            phone:'',
            photo: this.userLMethod.imageUrl,
          };

          console.log('Create Us:', profile);
          this.profileService.registeProfile(profile).subscribe((resp) => {
            const newUser = {
              email: this.userLMethod.email,
              fullName:this.userLMethod.name,
              profileId: resp.id,
              registrationMethod: 'GOOGLE'
            };
            this.authService.register(newUser).subscribe(
              (data) => {
                this.authService.saveToken(data.access_token);
                this.navCtrl.navigateRoot('/app/tabs/my-profile', {
                  animated: true,
                });
              },
              (err) => {
                console.log(err);
                this.uiAlerts.alertaInfo(err.error.message);
              }
            );
          });

        }
      });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }

  facebookAuth() {
    //this.router.navigateByUrl('/facebook-sesion');
    this.uiAlerts.alertaInfo('Función no disponible.');
  }

  registerPage() {
    this.router.navigateByUrl('/register');
  }
}
