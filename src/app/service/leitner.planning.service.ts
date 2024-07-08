import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeitnerPlanningService {

  constructor() { }

  private isReviewDay(level: number, checkDate: Date, startDate: Date): boolean {
    const daysInterval = Math.pow(2, level - 1);
    const daysSinceStart = Math.floor((checkDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return (daysSinceStart + 1) % daysInterval === 0;
  }


  getLevelsToReviewOnDate(checkDate: Date, startDate: Date): number[] {
    const levelsToReview: number[] = [];
    for (let level = 1; level <= 7; level++) {
      if (this.isReviewDay(level, checkDate, startDate)) {
        levelsToReview.push(level);
      }
    }
    return levelsToReview;
  }
}
