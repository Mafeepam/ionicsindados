import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendarOutline, readerOutline } from 'ionicons/icons';

import { DadosService } from '../../services/dados.service';
import { Noticia } from '../../models/noticia.model';

@Component({
  selector: 'app-noticias',
  standalone: true,
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon,
  ],
})
export class NoticiasPage implements OnInit {
  noticias: Noticia[] = [];

  constructor(
    private readonly dados: DadosService,
    private readonly alertCtrl: AlertController,
  ) {
    addIcons({ calendarOutline, readerOutline });
  }

  ngOnInit(): void {
    this.noticias = this.dados.getNoticias();
  }

  async abrirNoticia(noticia: Noticia): Promise<void> {
    const alerta = await this.alertCtrl.create({
      header: noticia.titulo,
      subHeader: `Publicado em ${noticia.data}`,
      message: noticia.conteudo,
      buttons: ['Fechar'],
    });

    await alerta.present();
  }
}
