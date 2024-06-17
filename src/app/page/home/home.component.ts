import { Component } from '@angular/core';
import { GameService } from '../../service/game.service';
import { CardModel } from '../../model/card.model';
import { CardService } from '../../service/card.service';
import { TagService } from '../../service/tag.service';
import { HeaderComponent } from "../../component/header/header.component";
import { FooterComponent } from '../../component/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [HeaderComponent, FooterComponent]
})
export class HomeComponent {

  constructor(private CardService: CardService,
    private TagService: TagService
  ) { }

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
}
