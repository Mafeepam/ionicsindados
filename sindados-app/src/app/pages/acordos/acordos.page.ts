import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonButton,
  IonIcon,
  IonNote,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { documentTextOutline, timeOutline, eyeOutline } from 'ionicons/icons';

import { DadosService } from '../../services/dados.service';
import { Acordo } from '../../models/acordo.model';

/**
 * RF04 — Lista de Acordos e Convenções Coletivas (ACTs e CCTs).
 *
 * Cada item exibe título/empresa, vigência, status em ion-badge
 * (Vigente / Em negociação) e um botão que abre um alerta simples
 * com o resumo das cláusulas principais.
 */
@Component({
  selector: 'app-acordos',
  standalone: true,
  templateUrl: './acordos.page.html',
  styleUrls: ['./acordos.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonButton,
    IonIcon,
    IonNote,
  ],
})
export class AcordosPage implements OnInit {
  acordos: Acordo[] = [];

  constructor(
    private readonly dados: DadosService,
    private readonly alertCtrl: AlertController,
  ) {
    addIcons({ documentTextOutline, timeOutline, eyeOutline });
  }

  ngOnInit(): void {
    this.acordos = this.dados.getAcordos();
  }

  /** Cor do ion-badge conforme o status do instrumento coletivo. */
  corStatus(acordo: Acordo): string {
    return acordo.status === 'Vigente' ? 'success' : 'warning';
  }

  /** Alerta simples com o resumo das cláusulas principais. */
  async verClausulas(acordo: Acordo): Promise<void> {
    const lista = acordo.clausulas.map((c) => `<li>${c}</li>`).join('');

    const alerta = await this.alertCtrl.create({
      header: acordo.titulo,
      subHeader: `Vigência ${acordo.vigencia} — ${acordo.status}`,
      message: `<p><strong>Cláusulas principais:</strong></p><ul>${lista}</ul>`,
      cssClass: 'alerta-clausulas',
      buttons: ['Fechar'],
    });

    await alerta.present();
  }
}
