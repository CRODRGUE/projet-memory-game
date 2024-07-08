import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { CardModel } from '../model/card.model';
import { TagModel } from '../model/tag.model';
import { PlanningModel } from '../model/plannig.model';

@Injectable({
  providedIn: 'root'
})
export class ConfDexieService {

  private db!: Dexie;

  public tagItem!: Table<TagModel, number>;
  public cardItem!: Table<CardModel, number>;
  public planningItem!: Table<PlanningModel, number>;

  constructor() {
    this.initDataBase();
  }

  private initDataBase() {
    this.db = new Dexie("CROD-memory-game");
    this.db.version(1).stores({
      tagItem: '++id,  &name',
      cardItem: '++id, id_tag',
      planningItem: '++id, id_tag'
    });

    this.tagItem = this.db.table('tagItem');
    this.cardItem = this.db.table('cardItem');
    this.planningItem = this.db.table('planningItem')
  }
}
