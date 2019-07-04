import { Gender } from "./player";

export enum Position {
    GK,
    DF,
    MF,
    FW
}

export interface PlayerTeamRelation {
    teamId: string;
    playerId: string;
    number: number;
    position: Position;
}

export interface PlayerTeamRelationEx extends PlayerTeamRelation{
    name: string;
    gender: Gender;
    bornYear: number;
}