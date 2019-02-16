import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import {GamesHistoryModel} from '../../app/models/games.history.model'
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import {RoundModel} from '../../app/models/round.model';
import {UserModel} from '../../app/models/user.model';
import{RoundCardsModel}from '../../app/models/round.cards.model';

@Injectable()
export class HistoryService{
    private url = "http://localhost:64548/api/History";

    constructor(private http: HttpClient) {
    }

    getGames():Observable<GamesHistoryModel[]>{
        return this.http.get(this.url+'/GetGames').pipe(map(x=>x as GamesHistoryModel[]));
    }

    getRounds(gameId:number):Observable<RoundModel[]>{
        return this.http.get(this.url+'/GetRounds/'+gameId).pipe(map(x=>x as RoundModel[]));
    }

    getUsers(gameId:number, roundId:number):Observable<UserModel[]>{
        return this.http.get(this.url+'/GetUsers/'+gameId+'/'+roundId).pipe(map(x => x as UserModel[]));
    }

    getCardsRound(roundId:number):Observable<RoundCardsModel>{
        return this.http.get(this.url+'/GetCardsRound/'+roundId).pipe(map(x=>x as RoundCardsModel));
    }
}