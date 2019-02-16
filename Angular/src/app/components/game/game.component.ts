import { Component, OnInit, Input } from "@angular/core";
import { GameService } from '../../services/game.service'
import { ActivatedRoute } from "@angular/router"
import { UserModel } from "../../models/user.model";
import {DealerAndBotsModel} from '../../models/dealer.and.bots.model'

@
    Component({
        selector: "game",
        templateUrl: './game.component.html',
        styleUrls: ["./game.component.css"],
        providers: [GameService]
    })
export class GameComponent implements OnInit {
    gameId: number;
    roundId: number;
    rate:number;
    flag:boolean = false;
    playerModel:UserModel = new UserModel();
    dealerModel:UserModel= new UserModel();
    winnerModel:UserModel = new UserModel();
    looserModel:UserModel = new UserModel();
    botsModel:UserModel[] = [];
    showWinner:boolean = false;
    showLooser:boolean = false;

    constructor(private activatedRoute: ActivatedRoute, private gameService: GameService) {
        this.gameId = this.activatedRoute.snapshot.params['id'];
    }
    ngOnInit(): void {
        this.gameService.createRound(this.gameId).subscribe(data=>{
            this.roundId = data;
            this.giveCards();
        });
        this.gameService.getRate(this.gameId).subscribe(data=>{
            this.rate = data;
        })
    }

    oneMore():void{
        this.gameService.oneMoreCard(this.playerModel.id ,this.roundId).subscribe(idCard=>{
            this.playerModel.cards.push(idCard);
        })
    }

    finishRound():void{
        var dealerAndBots = new DealerAndBotsModel();
        for(let i = 0; i< this.botsModel.length; i++){
            dealerAndBots.botsId.push(this.botsModel[i].id);
        }
        dealerAndBots.dealerId = this.dealerModel.id;
        dealerAndBots.roundId = this.roundId;
        this.gameService.giveCardsToII(dealerAndBots).subscribe(data=>
            this.gameService.finishRound(this.gameId,this.roundId).subscribe(data=>{
                if(data.money<=this.rate){
                    this.looserModel = data;
                    this.showLooser = true;
                }
                else{
                    this.winnerModel = data;
                    this.showWinner = true;
                }   
            }));
    }

    oneMoreRound(){
        window.location.replace('http://localhost:4200/game/'+this.gameId);
    }

    finishGame(){
        window.location.replace('http://localhost:4200/');
    }

    giveCards():void{
        this.gameService.getPlayer(this.gameId, this.roundId).subscribe(dataPlayer=>{
            this.playerModel = dataPlayer;
            this.gameService.getDealer(this.gameId, this.roundId).subscribe(dataDealer=>{
                this.dealerModel = dataDealer;
                this.gameService.getBots(this.gameId, this.roundId).subscribe(dataBots=>{
                    this.botsModel = dataBots;
                })
                this.flag=true;
            });
        })
        
        
    }

    onMainPage(){
        window.location.replace('http://localhost:4200/');
    }
}