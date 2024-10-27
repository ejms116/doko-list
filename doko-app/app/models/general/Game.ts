import { Party } from "./Constants";

export interface Game {
    id: number;
    played: Date;
    dealer: number;
    lead: number;
    seatScores: SeatScores;
}

export interface SeatScore {
    score: number;
    party: Party;
}

export interface SeatScores {
    [seatNumber: string]: SeatScore; 
}


