import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { UiAlertsService } from 'src/app/core/services/ui-alerts.service';
import { LoadingController, NavController } from '@ionic/angular';
import { ProfilesService } from 'src/app/markteplace/services/profiles.service';
import { RegisterProfile } from 'src/app/markteplace/model/profile';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user = {
    email: '',
    password: '',
    name: '',
    phone: '',
    confirmPassword: '',
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
    confirmPassword: [
      { type: 'required', message: 'Por favor Confirma tu contraseña' },
      {
        type: 'minlength',
        message: 'Las contraseña deben Considir',
      },
    ],
    phone: [
      { type: 'required', message: 'Por favor ingresa tu teléfono' },
      {
        type: 'minlength',
        message: 'El teléfono debe tener al menos  8 caracteres',
      },
    ],
    name: [
      { type: 'required', message: 'Por favor ingresa tu Nombre Completo' },
      {
        type: 'minlength',
        message: 'Ingresa tu ingresa tu Nombre Completo.',
      },
    ],
  };
  constructor(
    private navCtrl: NavController,
    public formbuider: FormBuilder,
    private uiAlerts: UiAlertsService,
    private loadingCtrl: LoadingController,
    private profileService: ProfilesService,
    private authService: AuthService,
    private storage: Storage
  ) {}

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
      phone: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(8)])
      ),
      name: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(10)])
      ),
      confirmPassword: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
    });
    await this.storage.create();

  }

  async register(value) {
    const loading = await this.loadingCtrl.create({
      message: 'Registrando...',
    });
    await loading.present();
    if (this.user.email === '' || this.user.password === '') {
      this.uiAlerts.alertaInfo('Todos los campos deben estar completos.');
      loading.dismiss();
    } else if (this.user.password !== this.user.confirmPassword) {
      this.uiAlerts.alertaInfo('Las contraseñas no considen.');
    } else {
      const profile: RegisterProfile = {
        name: this.user.name,
        publicEmail: this.user.email,
        phone: this.user.phone,
      };
      this.authService.getByEmail(this.user.email).subscribe((us) => {
        if (us) {
          loading.dismiss();
          console.log('us:', us);

          this.uiAlerts.alertaInfo('El Correo ya se encuentra registrado.');
        } else {
          this.profileService.registeProfile(profile).subscribe((resp) => {
            console.log(resp);
            const newUser = {
              email: this.user.email,
              password: this.user.confirmPassword,
              fullName: this.user.name,
              profileId: resp.id,
            };
            this.authService.register(newUser).subscribe(
              (data) => {
                console.log(data);
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
    }
    //this.router.navigateByUrl('/complete-profile');
    loading.dismiss();
  }
}
