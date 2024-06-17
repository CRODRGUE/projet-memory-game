import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GameService } from '../../service/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TagModel } from '../../model/tag.model';
import { CardModel } from '../../model/card.model';
import { CardComponent } from '../../component/form/card/card.component';
import { CardService } from '../../service/card.service';
import { TagService } from '../../service/tag.service';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';

@Component({
  selector: 'app-tag-details',
  standalone: true,
  imports: [CardComponent, HeaderComponent, FooterComponent],
  templateUrl: './tag-details.component.html',
  styleUrl: './tag-details.component.css'
})
export class TagDetailsComponent {
  idTag: number = -1;
  tagDetails!: TagModel;
  listCard: CardModel[] = [];
  listDisplayCards: CardModel[] = [];
  @ViewChild('formBlock') formElement!: ElementRef;
  @ViewChildren('levelBlock') levelElements!: QueryList<ElementRef>;

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
  }

  initDataComponent() {
    this.TagService.getTagById(this.idTag).then(dataTag => {
      this.tagDetails = dataTag;
      this.CardService.getCardByTag(this.idTag).then(dataCards => {
        this.listCard = dataCards;
      }).catch(err => {
        console.log(`Oups une erreur lie aux cartes : ${err}`);
      });
    }).catch(err => {
      console.log(`Oups une erreur lie à l'identifiant du TAG : ${err}`);
    });
  }


  choseLevel(event: Event) {
    console.log(event);
    this.levelElements.forEach(level => {
      console.log(level.nativeElement.getAttribute("data-level"));
    })
  }


  updateDataComponent() {
    this.initDataComponent();
  }

  openForm() {
    this.formElement.nativeElement.classList.add('form-visible');
  }

  closeForm() {
    console.log("test")
    this.formElement.nativeElement.classList.remove('form-visible');
  }
}
