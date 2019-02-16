import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateGameComponent} from '../app/components/create_game/create.game.component';
import { GameComponent } from '../app/components/game/game.component';
import { HistoryComponent } from '../app/components/history/history.component';

const routes:Routes=[
    {path:"", component: CreateGameComponent},
    {path:"game/:id", component:GameComponent},
    {path:'history', component:HistoryComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);