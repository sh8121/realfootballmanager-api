export enum Position {
    GK = 'GK',
    DF = 'DF',
    MF = 'MF',
    FW = 'FW'
}

export interface Player {
    teamId: string;
    playerId: string;
    name: string;
    number: number;
    position: Position;
}