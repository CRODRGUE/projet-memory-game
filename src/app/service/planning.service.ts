import { Injectable } from '@angular/core';
import { ConfDexieService } from './conf-dexie.service';
import { PlanningModel } from '../model/plannig.model';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  constructor(private DexieDB: ConfDexieService) { }

  async addTagToPlanning(item: PlanningModel): Promise<void> {
    return new Promise<void>(async (res, rej) => {
      await this.DexieDB.planningItem.add(item).then((id: number) => {
        return res();
      }).catch(() => {
        return rej("Echéc de l'ajout de la catégorie au planning");
      });
    })
  }

  async getItemPlanning(): Promise<PlanningModel[]> {
    return new Promise<PlanningModel[]>(async (res, rej) => {
      let result = await this.DexieDB.planningItem.toArray();
      result && result.length > 0 ? res(result) : rej('Echéc aucun item ajouté au planning');
    })
  }

  async deleteToPlanningByTagId(id: number): Promise<void> {
    return new Promise<void>(async (res, rej) => {
      await this.DexieDB.planningItem.where({ id_tag: id }).delete().then(() => {
        return res();
      }).catch(() => {
        return rej(`Echéc de la suppression de l'item avec l'id catégorie : ${id} du planning`);
      })
    });
  }
}
