import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TagModel } from '../../model/tag.model';
import { CardModel } from '../../model/card.model';
import { CardComponent } from '../../component/form/card/card.component';
import { CardService } from '../../service/card.service';
import { TagService } from '../../service/tag.service';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag-details',
  standalone: true,
  imports: [CardComponent, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './tag-details.component.html',
  styleUrl: './tag-details.component.css'
})
export class TagDetailsComponent {
  idTag: number = -1;
  currentLevel: number = 1;
  tagDetails!: TagModel;
  listCard: CardModel[] = [];
  listDisplayCards: CardModel[] = [];
  @ViewChild('formBlock') formElement!: ElementRef;
  @ViewChildren('levelBlock') levelElements!: QueryList<ElementRef>;
  @ViewChildren('responseBlock') responseElements!: QueryList<ElementRef>;
  @ViewChildren('responseBtn') responseBtnElements!: QueryList<ElementRef>;

  constructor(private TagService: TagService,
    private CardService: CardService,
    private Route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Récupération de l'id de la catégorie via les params
    this.Route.params.subscribe(params => {
      this.idTag = +params['id'];
      console.log(`TagDetails : id tag : ${this.idTag}`);
      this.initDataComponent();
    });
  }


  ngAfterViewInit() {
    this.levelElements.forEach(btn => btn.nativeElement.addEventListener('click', this.choseLevel.bind(this)));
    this.displayResponseEvent();
  }

  ngAfterViewChecked() {
    this.displayResponseEvent();
  }

  initDataComponent() {
    this.TagService.getTagById(this.idTag).then(dataTag => {
      this.tagDetails = dataTag;
      this.CardService.getCardByTag(this.idTag).then(dataCards => {
        this.listCard = dataCards;
        this.listDisplayCards = this.listCard.filter(card => card.level == 1);
      }).catch(err => {
        if (err == `Echéc aucune carte corresponde à la demande`) {
          this.listDisplayCards = [];
          return
        }
        console.log(`Oups une erreur lie aux cartes : ${err}`);
      });
    }).catch(err => {
      console.log(`Oups une erreur lie à l'identifiant du TAG : ${err}`);
    });
  }


  choseLevel(event: Event) {
    const levelAttribut: string | null = (event.currentTarget as HTMLElement).getAttribute("data-level");
    this.levelElements.forEach(level => {
      level.nativeElement.classList.remove('level-active');
      if (levelAttribut != null && !isNaN(+levelAttribut) && levelAttribut == level.nativeElement.getAttribute("data-level")) {
        level.nativeElement.classList.add('level-active');
        this.currentLevel = +levelAttribut;
        this.listDisplayCards = this.listCard.filter(card => card.level == this.currentLevel);
      }
    })
  }


  displayResponseEvent() {
    this.responseBtnElements.forEach((btn, index) => {
      if (!btn.nativeElement.hasEventListener) {
        btn.nativeElement.addEventListener('click', (event: Event) => {
          const currentQuestion = (event.currentTarget as HTMLElement).getAttribute('data-question');
          this.responseElements.forEach(response => {
            if (currentQuestion == response.nativeElement.getAttribute('data-question')) {
              response.nativeElement.classList.toggle('response-visible');
            }
          })
        });
        btn.nativeElement.hasEventListener = true;
      }
    });
  }

  updateDataComponent() {
    this.initDataComponent();
  }

  deleteCardById(id: number | undefined) {
    if (id) {
      console.log(id)
      this.CardService.deleteCardById(id).then(() => {
        this.initDataComponent();
      }).catch(err => {
        console.warn(`Oups une erreur lie à suppresion de la carte : ${err}`);
      })
      console.log(this.listDisplayCards);
      return
    }
    console.warn(`Oupss id invalide undefined`);
  }

  openForm() {
    this.formElement.nativeElement.classList.add('form-visible');
  }

  closeForm() {
    this.formElement.nativeElement.classList.remove('form-visible');
  }
}
