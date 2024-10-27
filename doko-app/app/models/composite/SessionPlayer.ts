import { SessionPlayerId } from "./SessionPlayerId";
import { Player } from "../general/Player";

export interface SessionPlayer {
    id: SessionPlayerId;
    player: Player;
    seat: number;
    score: number;
}