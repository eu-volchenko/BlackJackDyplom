import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router'
import { AppComponent } from './app.component';
import {CreateGameComponent} from '../app/components/create_game/create.game.component'
import { routing } from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import {GameComponent} from '../app/components/game/game.component';
import {NavMenuComponent} from './nav-menu/navmenu.component';
import{HistoryComponent}from '../app/components/history/history.component';


@NgModule({
  exports:[RouterModule],
  declarations: [
    AppComponent,
    CreateGameComponent,
    GameComponent,
    NavMenuComponent,
    HistoryComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    [routing]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
