import { Party, PARTY, GameType, GAME_TYPE } from "./Constants";

export interface Game {
    id: number;
    played: Date;
    dealer: number;
    lead: number;
    moreBock: boolean;
    bock: boolean;
    dokoGameType: GameType;
    winParty: Party;
    resultParty: Party;
    resultValue: number;
    ansageRe: boolean;
    ansageReVorab: boolean;
    ansageContra: boolean;
    ansageContraVorab: boolean;
    weitereAnsagenParty: Party;
    ansage: number;
    ansageVorab: number;

    seatScores: SeatScores;
}

export interface SeatScore {
    score: number;
    party: Party;
}

export interface SeatScores {
    [seatNumber: string]: SeatScore; 
}


