import { Component, EventEmitter, output, OutputEmitterRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModel } from '../../../model/card.model';
import { CardService } from '../../../service/card.service';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  formSubmitted: OutputEmitterRef<void> = output<void>();
  formClosed: OutputEmitterRef<void> = output<void>();

  erreur = true;
  idTag: number = -1;
  // Initialisation de la structure du formulaire (avec vérifiation des contraintes sur les champs )
  formCard = new FormGroup({
    questionText: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]),
    responseText: new FormControl('', [Validators.required, Validators.maxLength(255)]),
  });

  // Récupération des champs du formulaire
  get questionText() {
    return this.formCard.get('questionText');
  }
  get responseText() {
    return this.formCard.get('responseText');
  }

  constructor(private CardService: CardService,
    private Router: Router,
    private Route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Récupération de l'id de la catégorie via les params
    this.Route.params.subscribe(params => {
      this.idTag = +params['id'];
      console.log(`CardComponent : id tag : ${this.idTag}`);
    });
  }
  // Méthode executer lors de la validation du formulaire
  submitTag() {
    console.log(this.idTag);
    if (!this.formCard.valid) {
      console.warn(`Le formulaire n'est pas valide`);
      console.log(this.formCard.value);
      return
    }
    let card: CardModel = { question_text: this.formCard.value.questionText!, response_text: this.formCard.value.responseText!, id_tag: this.idTag, level: 1 };
    this.CardService.addCard(card).then(() => {
      this.formSubmitted.emit();
      this.formCard.reset();
    }).catch(err => {
      console.warn(`Oups erreur ajout de la carte : ${err}`);
    });
  }

  closeForm() {
    this.formClosed.emit();
  }
}
