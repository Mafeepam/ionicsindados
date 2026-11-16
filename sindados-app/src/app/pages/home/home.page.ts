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
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  newspaperOutline,
  documentTextOutline,
  logOutOutline,
  personCircleOutline,
} from 'ionicons/icons';

import { DadosService } from '../../services/dados.service';

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
    this.router.navigateByUrl(`/tabs/${rota}`);
  }

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
            this.router.navigateByUrl('/login', { replaceUrl: true });
          },
        },
      ],
    });

    await alerta.present();
  }
}
