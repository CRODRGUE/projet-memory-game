import { Component } from '@angular/core';
import { CardModel } from '../../model/card.model';
import { TagModel } from '../../model/tag.model';
import { CardService } from '../../service/card.service';
import { TagService } from '../../service/tag.service';
import { HeaderComponent } from "../../component/header/header.component";
import { FooterComponent } from '../../component/footer/footer.component';
import { NotificationService } from '../../service/notification.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [HeaderComponent, FooterComponent]
})
export class HomeComponent {

  constructor(private CardService: CardService,
    private TagService: TagService,
    private NotificationService: NotificationService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.NotificationService.requestNotificationPermission();
  }

  // notification test
  test() {
    console.log(Notification.permission);
    this.NotificationService.subscribeToNotifications();
    this.http.get('http://127.0.0.1:3000/').subscribe({
      next(value) {
        console.log(value);
      },
      error(err) {
        console.log(err)
      },
      complete() {
        console.log('end')
      },
    });
  }

  insertFakeData() {
    this.http.get<any>('../../assets/data/fake-data.json').subscribe({
      next: (data) => {
        data.categories.map((e: { titre: any; description: any; cartes: any[]; }) => {
          let tag: TagModel = {
            name: e.titre,
            description: e.description
          }
          this.TagService.addTag(tag).then(idTag => {
            e.cartes.map(card => {
              let item: CardModel = {
                level: 1,
                question_text: card.question,
                response_text: card.reponse,
                id_tag: idTag
              }
              this.CardService.addCard(item).then(card => {
                console.log('carte ajouté')
              })
            })
          })
        })
      },
      error(err) {
        console.log('Oupsss erreur lors de l\'ajout des données factices');
      },
      complete() {
        console.log('fin de l\'ajout des données factises');
      },
    })
  }
}
