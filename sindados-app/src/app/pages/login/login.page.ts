import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonCard,
  IonCardContent,
  IonText,
  IonIcon,
  IonNote,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alertCircleOutline, logInOutline, peopleCircleOutline } from 'ionicons/icons';

import { DadosService } from '../../services/dados.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    FormsModule,
    IonContent,
    IonInput,
    IonButton,
    IonItem,
    IonCard,
    IonCardContent,
    IonText,
    IonIcon,
    IonNote,
  ],
})
export class LoginPage {
  usuario = '';
  senha = '';
  erro = '';

  constructor(
    private readonly dados: DadosService,
    private readonly router: Router,
  ) {
    addIcons({ alertCircleOutline, logInOutline, peopleCircleOutline });
  }

  ionViewWillEnter(): void {
    this.usuario = '';
    this.senha = '';
    this.erro = '';
  }

  login(): void {
    this.erro = '';

    if (!this.usuario.trim() || !this.senha.trim()) {
      this.erro = 'Preencha a matrícula/e-mail e a senha para continuar.';
      return;
    }

    if (!this.dados.login(this.usuario, this.senha)) {
      this.erro = 'Matrícula/e-mail ou senha inválidos. Tente novamente.';
      return;
    }

    this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
  }
}
