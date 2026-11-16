import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  AlertController,
  NavController,
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
    private readonly navigation: NavController,
    private readonly alertCtrl: AlertController,
    private readonly router: Router,
  ) {
    addIcons({
      homeOutline,
      newspaperOutline,
      documentTextOutline,
      logOutOutline,
    });
  }

  getTabHref(tab: 'home' | 'noticias' | 'acordos'): string {
    // Ionic forwards href query parameters when selecting an uncached tab.
    return this.router.serializeUrl(
      this.router.createUrlTree(['/tabs', tab], {
        queryParamsHandling: 'preserve',
      }),
    );
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
