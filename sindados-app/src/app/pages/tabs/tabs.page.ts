import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  newspaperOutline,
  documentTextOutline,
  logOutOutline,
} from 'ionicons/icons';

import { DadosService } from '../../services/dados.service';

/**
 * RF02 — Menu de navegação por abas inferiores (ion-tabs) para alternar entre
 * Início, Notícias, ACTs/CCTs e Sair.
 */
@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.page.html',
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  constructor(
    private readonly dados: DadosService,
    private readonly router: Router,
    private readonly alertCtrl: AlertController,
  ) {
    addIcons({ homeOutline, newspaperOutline, documentTextOutline, logOutOutline });
  }

  /**
   * RF05 — "Sair": pede confirmação, limpa o estado de autenticação e
   * redireciona para a tela de login.
   */
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
