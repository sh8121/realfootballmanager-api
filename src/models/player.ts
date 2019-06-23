export enum Gender{
    MALE,
    FEMALE
}

export interface Player {
    playerId: string,
    password: string,
    name: string,
    gender: Gender,
    bornYear: number
}