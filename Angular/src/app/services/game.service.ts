import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import {UserModel} from '../models/user.model';
import {DealerAndBotsModel} from '../models/dealer.and.bots.model'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class GameService {
    private url = 'http://localhost:64548/api/Game';

    constructor(private http: HttpClient) {
    }
    getPlayer(gameId:number, roundId:number):Observable<UserModel>{
        return this.http.get(this.url+'/GetPlayerCards/'+gameId+'/'+roundId).pipe(map(x=>x as UserModel));
    }

    getDealer(gameId:number, roundId:number):Observable<UserModel>{
        return this.http.get(this.url+'/GetDealerCards/'+gameId+'/'+roundId).pipe(map(x=>x as UserModel));
    }

    getBots(gameId:number, roundId:number):Observable<UserModel[]>{
        return this.http.get(this.url+'/GetBotsCards/'+gameId+'/'+roundId).pipe(map(x=>x as UserModel[]));
    }

    createRound(gameId: number):Observable<number> {
        return this.http.get(this.url + "/CreateRound/"+ gameId).pipe(map(x=>x as number));
    }

    oneMoreCard(playerId:number, roundId:number):Observable<number>{
        return this.http.get(this.url+'/OneMore/'+roundId+'/'+playerId).pipe(map(x=>x as number));
    }

    finishRound(gameId:number, roundId:number):Observable<UserModel>{
        return this.http.get(this.url+'/FinishRound/'+gameId+'/'+roundId).pipe(map(x=>x as UserModel));
    } 

    giveCardsToII(data:DealerAndBotsModel){
        return this.http.post(this.url+'/OneMoreBots/',data);
    }

    getRate(gameId:number):Observable<number>{
        return this.http.get(this.url+'/GetRate/'+gameId).pipe(map(x=>x as number));
    }
}