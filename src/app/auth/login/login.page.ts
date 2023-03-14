import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
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
    private storage: Storage,
    public formbuider: FormBuilder,
    private uiAlerts: UiAlertsService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    await this.storage.create();
    const valid = await this.authService.validaToken();
    if (valid) {
      this.router.navigateByUrl('/app');
    }
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
  }

  login(value) {
    if (this.user.email === '' || this.user.password === '') {
      //mostrar alerta de usuario incorrecto
      this.uiAlerts.alertaInfo('Todos los campos deben estar completos.');
    } else {
      /* const valido = await this.usuarioService.login(
        this.user.email,
        this.user.password
      ); */
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
  googleAuth() {
    this.router.navigateByUrl('/google-sesion');
  }

  facebookAuth() {
    this.router.navigateByUrl('/facebook-sesion');
  }
}
