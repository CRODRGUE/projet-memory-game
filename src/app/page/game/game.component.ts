import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../service/game.service';
import { CardModel } from '../../model/card.model';
import { CardService } from '../../service/card.service';
import { TagModel } from '../../model/tag.model';
import { TagService } from '../../service/tag.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  // params de l'URL
  id_tag: number = -1;
  level: number = -1;

  // données à afficher
  listCards!: CardModel[];
  currentCardIndex: number = 0;
  tagDetails!: TagModel;

  // stockage des carte validées & non validées durant la partie
  listValidateCards: CardModel[] = [];
  listNotValidateCards: CardModel[] = [];

  constructor(private Route: ActivatedRoute,
    private CardService: CardService,
    private TagService: TagService,
  ) {
    this.Route.params.subscribe((params) => {
      this.id_tag = +params['id_tag'];
      this.level = +params['level'];
    });
  }
  async ngOnInit(): Promise<void> {
    await this.initGame(this.id_tag, this.level);
  }

  async initGame(id_tag: number, level: number) {
    await this.TagService.getTagById(id_tag).then(async (dataTag) => {
      this.tagDetails = dataTag;
      await this.CardService.getCardByLevelAndTag({ id_tag, level }).then(listCards => {
        this.listCards = listCards;
      }).catch(err => {
        console.warn(`Oups erreur lors de la récupération des données liées à la catégorie`);
      });
    }).catch(err => {
      console.warn(`Oups erreur lors de la récupération des carte liées à la catégorie & level`);
    })
  }


  updateResponseDisplay() {
    document.querySelector('.response')?.classList.toggle('response-active');
  }

  async nextCard(chose: number) {
    if (chose == 1) {
      this.listValidateCards.push(this.listCards[this.currentCardIndex]);
    } else {
      this.listNotValidateCards.push(this.listCards[this.currentCardIndex]);
    }
    document.querySelector('.response')?.classList.remove('response-active');
    if (this.currentCardIndex == this.listCards.length - 1) {
      await this.endGame();
    } else {
      this.currentCardIndex++
    }
  }


  async endGame() {
    await this.listValidateCards.forEach(async card => {
      if (card.id) {
        await this.CardService.updateCardLevel(card.id, card.level + 1).then(v => console.log(v));
      }
    });

    await this.listNotValidateCards.forEach(async card => {
      if (card.id) {
        await this.CardService.updateCardLevel(card.id, card.level - 1).then(v => console.log(v));
      }
    });

    console.log('update changement level ok');
  }


}
