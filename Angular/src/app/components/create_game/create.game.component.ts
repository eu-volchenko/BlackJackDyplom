import { Component, OnInit } from '@angular/core';
import { CreateGameService } from '../../services/create_game/create.game.service';
import { InnerGameModel } from '../../models/inner.game.model';
import { InnerGameModelForServer } from "../../models/inner.game.model.for.server";

@Component({
    selector: 'creategame',
    templateUrl: './create.game.component.html',
    styleUrls: ['./create.game.component.css'],
    providers: [CreateGameService]
})
export class CreateGameComponent implements OnInit {
    ngOnInit(): void {
    }
    innerGameModelForServer: InnerGameModelForServer;
    innerGameModel: InnerGameModel;
    maxCountOfBots:number = 4;
    minCountOfBots:number = 0;
    errorList:string;
    error:boolean=false;
    

    constructor(private createGameService: CreateGameService) {
        this.innerGameModel = new InnerGameModel();
        this.innerGameModelForServer = new InnerGameModelForServer();
    }

    save(): void {
        //this.innerGameModel.numberOfBots = this.innerGameModel.nameOfBots.length;
        this.innerGameModelForServer.dealerName = this.innerGameModel.dealerName;
        this.innerGameModelForServer.rate = this.innerGameModel.rate;
        this.innerGameModelForServer.money = this.innerGameModel.money;
        this.innerGameModelForServer.playerName = this.innerGameModel.playerName;
        this.innerGameModelForServer.numberOfBots = this.innerGameModel.numberOfBots;
        for (var i = 0; i < this.innerGameModel.nameOfBots.length; i++) {
            this.innerGameModelForServer.nameOfBots.push(this.innerGameModel.nameOfBots[i].botName);
        }
        this.createGameService.createGame(this.innerGameModelForServer).then(data=>{
            window.location.replace("http://localhost:4200/game/"+data);
        }).catch(err=>{
            this.errorList = err.error;
            this.error=true;
        }
        );
    }

    addBot(): void {
        if (this.innerGameModel.numberOfBots <= this.maxCountOfBots) {
            this.innerGameModel.nameOfBots.push({ botName: "" });
            this.innerGameModel.numberOfBots = this.innerGameModel.nameOfBots.length;
        }

    }

    deleteBot(): void {
        if (this.innerGameModel.numberOfBots >= this.minCountOfBots) {
            this.innerGameModel.nameOfBots.splice(-1);
            this.innerGameModel.numberOfBots = this.innerGameModel.nameOfBots.length;
        }
    }
}