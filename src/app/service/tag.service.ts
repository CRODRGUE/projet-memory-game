import { Injectable } from '@angular/core';
import { ConfDexieService } from './conf-dexie.service';
import { TagModel } from '../model/tag.model';


@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private DexieDB: ConfDexieService,
  ) { }

  async addTag(tag: TagModel): Promise<number> {
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
      await this.DexieDB.cardItem.where({ id_tag: id }).delete().then(async () => {
        await this.DexieDB.tagItem.delete(id).then(async () => {
          res();
        }).catch(() => {
          rej(`Echéc de la suppression de la catégorie avec l'id ${id}`);
        });
      }).catch(() => {
        rej(`Echéc de la suppression des cartes avec l'id de catégorie : ${id}`);
      });
    });
  }
}





