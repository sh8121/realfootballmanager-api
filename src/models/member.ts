export enum Gender{
    MALE,
    FEMALE
}

export interface Member{
    memberId: string;
    password: string;
    name: string;
    gender: Gender;
    bornYear: number;
}