import { Routes } from '@angular/router';
import { ListTagComponent } from './page/list-tag/list-tag.component';
import { HomeComponent } from './page/home/home.component';
import { TagDetailsComponent } from './page/tag-details/tag-details.component';
import { GameComponent } from './page/game/game.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { PlanningComponent } from './page/planning/planning.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'acceuil'
    },
    {
        path: 'tag/list',
        component: ListTagComponent,
        title: 'liste des catégories'
    },
    {
        path: 'tag/:id',
        component: TagDetailsComponent,
        title: 'détaille catégorie'
    },
    {
        path: 'game/:id_tag/:level',
        component: GameComponent,
        title: 'révision'
    },
    {
        path: 'planning',
        component: PlanningComponent,
        title: 'planning de révision'
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'Oupss introuvable'
    },
];
