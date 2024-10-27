export const PARTY = {
    RE: 'RE',
    CONTRA: 'CONTRA',
    INAKTIV: 'INAKTIV'
}

type ObjectValues<T> = T[keyof T];
export type Party = ObjectValues<typeof PARTY>

export const nextParty = (party: Party): Party => {
    switch(party) {
        case PARTY.RE:
            return PARTY.INAKTIV;
        case PARTY.CONTRA:
            return PARTY.RE;
        default:
            return PARTY.CONTRA;
    }
}


export const GAME_TYPE = {
    NORMAL: 'NORMAL',
    BUBEN_SOLO: 'BUBEN_SOLO',
    DAMEN_SOLO: 'DAMEN_SOLO',
    TRUMPF_SOLO: 'TRUMP_SOLO',
    HOCHZEIT: 'HOCHZEIT',
    HOCHZEIT_STILL: 'HOCHZEIT_STILL'
}

export type GameType = ObjectValues<typeof GAME_TYPE>