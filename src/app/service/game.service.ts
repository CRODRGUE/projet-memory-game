import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { CardModel } from '../model/card.model';
import { TagModel } from '../model/tag.model';
import { ConfDexieService } from './conf-dexie.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  /*   private db!: Dexie;
  
    private tagItem!: Table<TagModel, number>;
    private cardItem!: Table<CardModel, number>;
  
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
    } */

  constructor(private DexieDB: ConfDexieService) { }

  // ********** CRUD TAG ********
  /*   async addTag(tag: TagModel): Promise<number> {
      return await this.DexieDB.tagItem.add(tag)
    }
  
    async getAllTag(): Promise<TagModel[]> {
      return new Promise(async (res, rej) => {
        let result = await this.DexieDB.tagItem.toArray();
        result && result.length > 0 ? res(result) : rej('Echéc aucune carte enregistrée')
      })
    }
  
    async getTagById(id: number): Promise<TagModel> {
      return new Promise(async (res, rej) => {
        let result = await this.DexieDB.tagItem.get(id);
        result ? res(result) : rej(`Echéc de la recuparation du tag. Tag avec l'id : ${id} inexistant`)
      });
    }
  
    async getTagByName(name: string): Promise<TagModel> {
      return new Promise(async (res, rej) => {
        let result = await this.DexieDB.tagItem.where('name').equals(name).first();
        result ? res(result) : rej('Echéc de la recuparation du tag')
      });
    }
  
    async deleteTagById(id: number): Promise<void> {
      return new Promise(async (res, rej) => {
        await this.DexieDB.tagItem.delete(id).then(async () => {
          await this.DexieDB.cardItem.where({ id_tag: id }).delete();
          res();
        }).catch(() => {
          rej(`Echéc de la suppression de la catégorie avec l'id ${id}`);
        });
      });
    } */

  // ************* CRUD CARD ***************

  /* async addCard(card: CardModel): Promise<CardModel> {
    return new Promise(async (res, rej) => {
      this.getTagById(card.id_tag).catch(() => {
        rej('Echec de la création de la carte catégorie non trouvée')
      });

      this.DexieDB.cardItem.add(card).then((id_card) => {
        card.id = id_card;
        res(card);
      }).catch((err) => {
        console.warn(err);
        rej('Echéc de la création de la carte une erreur s\'est produite');
      });
    });
  }

  async getAllCard(): Promise<CardModel[]> {
    return new Promise(async (res, rej) => {
      let result = await this.DexieDB.cardItem.toArray();
      result && result.length > 0 ? res(result) : rej('Echéc aucune carte enregistrée')
    });
  }

  async getCardById(id: number): Promise<CardModel> {
    return new Promise(async (res, rej) => {
      let result = await this.DexieDB.cardItem.get(id);
      result ? res(result) : rej(`Echéc de la recuparation de la carte. Carte avec id : ${id} inexistante ? `)
    });
  }

  async getCardByTag(id_tag: number): Promise<CardModel[]> {
    return new Promise(async (res, rej) => {
      await this.getTagById(id_tag).catch(() => {
        rej('Echec de la récuperation des cartes catégorie non trouvée');
      });
      let result = await this.DexieDB.cardItem.where({ id_tag: id_tag }).toArray();
      result && result.length > 0 ? res(result) : rej(`Echéc aucune carte corresponde à la demande`);
    });
  }

  async getCardByLevelAndTag({ id_tag, level }: { id_tag: number, level: number }): Promise<CardModel[]> {
    return new Promise(async (res, rej) => {
      await this.getTagById(id_tag).catch(() => {
        rej('Echec de la récuperation des cartes catégorie non trouvée');
      });
      let result = await this.DexieDB.cardItem.where({ id_tag: id_tag, level: level }).toArray();
      result && result.length > 0 ? res(result) : rej(`Echéc aucune carte corresponde à la demande`);
    });
  }

  async updateCardLevel(id: number, newLevel: number): Promise<number> {
    return new Promise(async (res, rej) => {
      let result = await this.DexieDB.cardItem.update(id, { level: newLevel });
      result ? res(1) : rej(`Echéc de la modification du niveau de la carte avec l'id : ${id}`);
    });
  }

  async deleteCardById(id: number): Promise<void> {
    return new Promise(async (res, rej) => {
      await this.DexieDB.cardItem.delete(id).then(() => {
        res();
      }).catch(() => {
        rej(`Echéc de la suppression de la carte avec l'id ${id}`);
      });
    });
  } */
}
