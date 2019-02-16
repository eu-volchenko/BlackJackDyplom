import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { InnerGameModelForServer } from "../../models/inner.game.model.for.server";
import { catchError, map } from 'rxjs/operators';
import { throwError, pipe, Observable } from 'rxjs';
import { debug } from 'util';
import { IPromise } from 'q';
//import {catchError} from'rxjs/operators'; 



@Injectable()
export class CreateGameService {
    private url = "http://localhost:64548/api/Game/CreateGame/";
    constructor(private http: HttpClient) {

    }
    id:number;
    createGame(innerGameModel: InnerGameModelForServer) : Promise<number>{
        return this.http.post<number>(this.url, innerGameModel).toPromise();
    }

}