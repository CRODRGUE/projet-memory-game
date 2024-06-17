import { Component, output, OutputEmitterRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TagModel } from '../../../model/tag.model';
import { TagService } from '../../../service/tag.service';
import { CommonModule, NgClass } from '@angular/common';


@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgClass],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent {
  formsubmitted: OutputEmitterRef<number> = output<number>();
  formsClosed: OutputEmitterRef<void> = output<void>();

  form_tag = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
  });
  // ,{updateOn: 'submit' }
  get name() {
    return this.form_tag.get('name');
  }

  get description() {
    return this.form_tag.get('description');
  }

  constructor(private TagService: TagService,
  ) { }

  submitTag() {
    if (!this.form_tag.valid) {
      console.warn(`Le formulaire n'est pas valide : ${this.form_tag.value.name}`);
      return
    }
    let tag: TagModel = { name: this.form_tag.value.name!, description: this.form_tag.value.description! };
    this.TagService.addTag(tag).then((idTag) => {
      this.formsubmitted.emit(idTag)
    }).catch(err => {
      console.warn(`Oups erreur ajout de la catégorie : ${err}`);
    });
  }

  closeFrom() {
    this.formsClosed.emit();
  }
}
