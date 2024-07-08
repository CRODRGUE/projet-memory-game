import { Component, Pipe } from '@angular/core';
import { PlanningService } from '../../service/planning.service';
import { TagService } from '../../service/tag.service';
import { PlanningModel } from '../../model/plannig.model';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { LeitnerPlanningService } from '../../service/leitner.planning.service';
import { ItemPlanningModel } from '../../model/planning.item.model';
import { TagModel } from '../../model/tag.model';

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule, ReactiveFormsModule, DatePipe],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.css'
})
export class PlanningComponent {

  searchDate: Date = new Date(Date.now())
  listItemsPlanning: ItemPlanningModel[] = [];
  formSearch = new FormGroup({
    searchDate: new FormControl(formatDate(this.searchDate, 'yyyy-MM-dd', 'en'), [Validators.required])
  })

  dateTest: Date = new Date();
  constructor(private PlannigService: PlanningService,
    private TagService: TagService, private LeitnerService: LeitnerPlanningService) { }


  ngOnInit(): void {
    this.checkPlanning(this.searchDate);
  }

  checkPlanning(searchDate: Date) {
    this.PlannigService.getItemPlanning().then((items: PlanningModel[]) => {
      this.listItemsPlanning = []
      items.forEach(async item => {
        let listLevel = this.LeitnerService.getLevelsToReviewOnDate(searchDate, item.start_date)
        if (listLevel.length > 0) {
          await this.TagService.getTagById(item.id_tag).then((tag: TagModel) => {
            this.listItemsPlanning.push({ id_tag: tag.id!, name_tag: tag.name, list_level: listLevel })
          })
        }
      })
    }).catch(err => {
      console.log(err);
    })
  }


  submitSearch() {
    if (this.formSearch.valid) {
      this.searchDate = new Date(this.formSearch.value.searchDate ? this.formSearch.value.searchDate : new Date(Date.now()))
      this.checkPlanning(this.searchDate)
    }
  }


  getTag() {
    this.PlannigService.getItemPlanning().then((items: PlanningModel[]) => {
      console.log(items);
    }).catch(err => console.log(err))
  }
}
