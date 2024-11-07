export const PARTY = {
    Re: 'Re',
    Contra: 'Contra',
    Inaktiv: 'Inaktiv'
}

type ObjectValues<T> = T[keyof T];
export type Party = ObjectValues<typeof PARTY>

export const nextParty = (party: Party): Party => {
    switch(party) {
        case PARTY.Re:
            return PARTY.Inaktiv;
        case PARTY.Contra:
            return PARTY.Re;
        default:
            return PARTY.Contra;
    }
}


export const GAME_TYPE = {
    NORMAL: 'NORMAL',
    BUBEN_SOLO: 'BUBEN_SOLO',
    DAMEN_SOLO: 'DAMEN_SOLO',
    TRUMPF_SOLO: 'TRUMPF_SOLO',
    HOCHZEIT: 'HOCHZEIT',
    HOCHZEIT_STILL: 'HOCHZEIT_STILL'
}

export type GameType = ObjectValues<typeof GAME_TYPE>