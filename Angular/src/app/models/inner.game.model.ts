export class InnerGameModel {
    constructor(
        public id?: number,
        public playerName?: string,
        public rate?: number,
        public money?: number,
        public numberOfBots: number =0,
        public dealerName?: string,
        public nameOfBots: { botName: string }[] = []) { }
}