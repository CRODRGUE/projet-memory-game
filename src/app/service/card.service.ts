import { Injectable } from '@angular/core';
import { ConfDexieService } from './conf-dexie.service';
import { CardModel } from '../model/card.model';
import { TagService } from './tag.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private DexieDB: ConfDexieService,
    private TagService: TagService
  ) { }


  async addCard(card: CardModel): Promise<CardModel> {
    return new Promise(async (res, rej) => {
      this.TagService.getTagById(card.id_tag).catch(() => {
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
      await this.TagService.getTagById(id_tag).catch(() => {
        rej('Echec de la récuperation des cartes catégorie non trouvée');
      });
      let result = await this.DexieDB.cardItem.where({ id_tag: id_tag }).toArray();
      result && result.length > 0 ? res(result) : rej(`Echéc aucune carte corresponde à la demande`);
    });
  }

  async getCardByLevelAndTag({ id_tag, level }: { id_tag: number, level: number }): Promise<CardModel[]> {
    return new Promise(async (res, rej) => {
      await this.TagService.getTagById(id_tag).catch(() => {
        rej('Echec de la récuperation des cartes catégorie non trouvée');
      });
      let result = await this.DexieDB.cardItem.where({ id_tag: id_tag, level: level }).toArray();
      result && result.length > 0 ? res(result) : rej(`Echéc aucune carte corresponde à la demande`);
    });
  }

  async updateCardLevel(id: number, newLevel: number): Promise<number> {
    return new Promise(async (res, rej) => {
      console.log(id, newLevel);
      console.log('00');
      if (newLevel > 7) {
        console.log('01');
        await this.deleteCardById(id).then(() => {
          res(1);
        }).catch(() => {
          rej(`Echéc de la suppresion (nouveau niveau > 7) pour la carte avec l'id ${id}`);
        });
      }
      if (newLevel < 1) {
        console.log('02');
        newLevel = 1;
      }
      let result = await this.DexieDB.cardItem.update(id, { level: newLevel });
      console.log('03');
      result ? res(1) : rej(`Echéc de la modification du niveau de la carte avec l'id : ${id}`);
    });
  }

  async deleteCardByIdTag(id_tag: number): Promise<void> {
    return new Promise(async (res, rej) => {
      await this.DexieDB.cardItem.where({ id_tag: id_tag }).delete().then(() => {
        res();
      }).catch(() => {
        rej(`Echéc de la suppression des cartes avec l'id de catégorie : ${id_tag}`);
      });
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
  }
}
