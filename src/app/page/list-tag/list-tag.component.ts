import { Component, ElementRef, ViewChild } from '@angular/core';
import { TagModel } from '../../model/tag.model';
import { TagComponent } from '../../component/form/tag/tag.component';
import { Router, RouterModule } from '@angular/router';
import { TagService } from '../../service/tag.service';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';

@Component({
  selector: 'app-list-tag',
  standalone: true,
  imports: [TagComponent, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './list-tag.component.html',
  styleUrl: './list-tag.component.css',
})
export class ListTagComponent {
  listTag!: TagModel[];
  @ViewChild('fromBlock') formElement!: ElementRef;

  constructor(private TagService: TagService,
    private Router: Router
  ) {
    this.getAllTag();
  }

  getAllTag() {
    this.TagService.getAllTag()
      .then((dataTag) => {
        this.listTag = dataTag;
      }).catch(err => {
        console.warn(`Erreur lors de la récuperation des tag : ${err}`);
      });
  }

  deleteTagById(id: number | undefined) {
    console.log(`delete TAG ${id}`)
    if (id != undefined) {
      this.TagService.deleteTagById(id).then(() => {
        this.getAllTag();
      }).catch(err => {
        console.warn(`Erreur lors de la supression du tag avec l'identifiant ${id} : ${err}`);

      });
    }
  }

  openForm() {
    this.formElement.nativeElement.classList.add('form-visible');
  }

  closeForm() {
    this.formElement.nativeElement.classList.remove('form-visible');
  }

  newTag(idTag: number) {
    this.Router.navigate(["tag", idTag]);
  }
}
