interface MatchElement {
    goal: number;
    assist: number;
    shot: number;
    shotOnTarget: number;
    shutOff: number
    clear: number;
    block: number;
    save: number;
    foul: number;
    offside: number;
    yellowCard: number;
    redCard: number;
    cornerKick: number;
    freeKick: number;
    panaltyKick: number;
    passMiss: number;
    controlMiss: number;
}

export interface Match extends MatchElement {
    teamId: string;
    competitorName: string;
    teamScore: number;
    competitorScore: number;
}

export interface PlayerInMatch extends MatchElement {
    matchId: number;
    teamId: string;
    playerId: string;
}