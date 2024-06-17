import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { CardModel } from '../model/card.model';
import { TagModel } from '../model/tag.model';

@Injectable({
  providedIn: 'root'
})
export class ConfDexieService {

  private db!: Dexie;

  public tagItem!: Table<TagModel, number>;
  public cardItem!: Table<CardModel, number>;

  constructor() {
    this.initDataBase();
  }

  private initDataBase() {
    this.db = new Dexie("test-memory");
    this.db.version(1).stores({
      tagItem: '++id,  &name',
      cardItem: '++id, id_tag'
    });

    this.tagItem = this.db.table('tagItem');
    this.cardItem = this.db.table('cardItem');
  }
}
