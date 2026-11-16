import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  AlertController,
  NavController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  newspaperOutline,
  documentTextOutline,
  logOutOutline,
  personCircleOutline,
} from 'ionicons/icons';

import { DadosService } from '../../services/dados.service';

/**
 * RF02 — Tela Inicial (Home).
 *
 * Cabeçalho identificando o SINDADOS-BA, mensagem de boas-vindas ao
 * trabalhador associado e botões de acesso rápido às demais telas.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
  ],
})
export class HomePage {
  associado = '';
  totalNoticias = 0;
  totalAcordos = 0;
  acordosVigentes = 0;

  constructor(
    private readonly dados: DadosService,
    private readonly router: Router,
    private readonly navigation: NavController,
    private readonly alertCtrl: AlertController,
  ) {
    addIcons({
      newspaperOutline,
      documentTextOutline,
      logOutOutline,
      personCircleOutline,
    });
  }

  ionViewWillEnter(): void {
    this.associado = this.dados.associado;
    this.totalNoticias = this.dados.getNoticias().length;

    const acordos = this.dados.getAcordos();
    this.totalAcordos = acordos.length;
    this.acordosVigentes = acordos.filter((a) => a.status === 'Vigente').length;
  }

  irPara(rota: string): void {
    this.router.navigate(['/tabs', rota], {
      queryParamsHandling: 'preserve',
    });
  }

  /** RF05 — limpa a autenticação e volta para o login. */
  async sair(): Promise<void> {
    const alerta = await this.alertCtrl.create({
      header: 'Sair do aplicativo',
      message: 'Deseja encerrar a sessão?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Sair',
          role: 'confirm',
          handler: () => {
            this.dados.logout();
            this.navigation.navigateRoot(['/login'], {
              replaceUrl: true,
              queryParamsHandling: 'preserve',
            });
          },
        },
      ],
    });

    await alerta.present();
  }
}
