export class DealerAndBotsModel{
    constructor(
        public dealerId?:number,
        public botsId:number[]=[],
        public roundId?:number
    ){}
}