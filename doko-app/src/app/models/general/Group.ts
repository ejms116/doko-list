import { Player } from "./Player";

export interface Group {
    id: number;
    name: string;
    founder: Player;
    founded: Date;
    players: Player[];
}