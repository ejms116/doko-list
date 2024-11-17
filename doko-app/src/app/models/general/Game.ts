import { Party, PARTY, GameType, GAME_TYPE, SOPO_TYPE, SopoType } from "./Constants";

export interface GameResponse {
    dokoGame: Game;
    errors: string[];
    warnings: string[];
    infos: string[];
}

export interface Game {
    id: number;
    played: Date;
    dealer: number;
    lead: number;
    soloPlayer: number;
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

    sonderpunkte: Sopo[]
}

export interface SeatScore {
    score: number;
    party: Party;
}

export interface SeatScores {
    [seatNumber: number]: SeatScore; 
}

export interface Sopo {
    dokoParty: Party;
    type: SopoType;
}

