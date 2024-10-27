import { Group } from "./Group";
import { SessionPlayer } from "../composite/SessionPlayer";

export interface Session {
    id: number;
    group: Group;
    played: Date;
    location: string;
    sessionPlayers: SessionPlayer[]

}