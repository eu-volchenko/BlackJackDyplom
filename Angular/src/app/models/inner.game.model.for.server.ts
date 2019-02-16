export class InnerGameModelForServer {
    constructor(
        public id?: number,
        public playerName?: string,
        public rate?: number,
        public money?:number,
        public numberOfBots?: number,
        public dealerName?: string,
        public nameOfBots: string[]=[]) { }
}