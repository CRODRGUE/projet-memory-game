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

  /*  tagAdd() {
   this.GameService.addTag("JS").then((value) => console.log(value)).catch(err => console.warn(err));
 } */

  tagGetAll() {
    this.TagService.getAllTag().then((value) => console.log(value)).catch(err => console.warn(err));
  }

  tagGetById(id: number) {
    this.TagService.getTagById(id).then(value => console.log(value)).catch(err => console.warn(err));
  }

  tagDeleteById(id: number) {
    this.TagService.deleteTagById(id).then(value => console.log(value)).catch(err => console.warn(err));
  }

  cardGetAll() {
    this.CardService.getAllCard().then(value => console.log(value)).catch(err => console.warn(err));
  }

  cardGetById(id: number) {
    this.CardService.getCardById(id).then(value => console.log(value)).catch(err => console.warn(err));
  }

  cardGetByTag(id: number) {
    this.CardService.getCardByTag(id).then(value => console.log(value)).catch(err => console.warn(err));
  }

  cardGetByTagAndLevel(id_tag: number, lvl: number) {
    this.CardService.getCardByLevelAndTag({ id_tag: id_tag, level: lvl }).then(value => console.log(value)).catch(err => console.warn(err));
  }

  cardAdd() {
    let card: CardModel = {
      level: 1,
      question_text: 'test question 05',
      response_text: 'test res01',
      id_tag: 6
    }
    this.CardService.addCard(card).then(value => console.log(value)).catch(err => console.warn(err));
  }

  cardUpdateLevelCard() {
    this.CardService.getCardById(2).then(async value => {
      console.log(value);
      this.CardService.updateCardLevel(2, (value.level + 1)).then(value => {
        console.log(value);
      }).catch(err => {
        console.warn(err);
      });
    }).catch(err => {
      console.warn(err);
    });
  }

  cardDeleteById(id: number) {
    this.CardService.deleteCardById(id).then(value => console.log(value)).catch(err => console.warn(err));
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
