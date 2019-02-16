import {Component, OnInit} from '@angular/core';
import {GamesHistoryModel} from '../../models/games.history.model'
import{HistoryService} from '../../services/history.service'
import {RoundModel} from '../../models/round.model';
import {UserModel} from '../../models/user.model';
import { RoundCardsModel} from '../../models/round.cards.model';

@Component({
    selector:'history',
    templateUrl:'./history.component.html',
    styleUrls: ["./history.component.css"],
    providers: [HistoryService]
})
export class HistoryComponent implements OnInit{
    gameHistoryModel:GamesHistoryModel[] = [];
    cardsRound:RoundCardsModel;
    roundModel:RoundModel[]=[];
    showDetails:boolean = false;
    showDeepDetails:boolean = false;
    userModel:UserModel[]=[];
    gameId:number;
    showCardDeck:boolean = false;
    constructor(private historySevice: HistoryService){

    }

    ngOnInit(): void {
        this.historySevice.getGames().subscribe(data=>{
            this.gameHistoryModel = data
        });
    }

    getRounds(gameId:number):void{
        this.gameId = gameId;
        this.historySevice.getRounds(gameId).subscribe(data=>{
            this.roundModel = data;
        });
        this.showDetails = true;

    }

    getUsers(roundId:number):void{
        this.historySevice.getUsers(this.gameId, roundId).subscribe(data=>{
            this.userModel = data;
            this.showDeepDetails=true;
            this.showCardDeck = false;
        });

    }

    getRoundCards(roundId:number):void{
        this.historySevice.getCardsRound(roundId).subscribe(data=>{
            this.cardsRound = data;
            this.showCardDeck = true;
            this.showDeepDetails = false;
        })
    }
    
    closeDetails():void{
        this.showDeepDetails = false;
        this.showDetails = false;
    }
}