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
            return PARTY.Contra;
        case PARTY.Contra:
            return PARTY.Re;
        default:
            return PARTY.Inaktiv;
    }

    // switch(party) {
    //     case PARTY.Re:
    //         return PARTY.Inaktiv;
    //     case PARTY.Contra:
    //         return PARTY.Re;
    //     default:
    //         return PARTY.Contra;
    // }
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

export const SOPO_TYPE = {
    FUCHS_GEFANGEN: 'FUCHS_GEFANGEN',
    FUCHS_AM_END: 'FUCHS_AM_END',
    FUCHSJAGD_GESCHAFFT: 'FUCHSJAGD_GESCHAFFT',
    FUCHSJAGD_FEHLGESCHLAGEN: 'FUCHSJAGD_FEHLGESCHLAGEN',
    DULLE_GEFANGEN: 'DULLE_GEFANGEN',
    CHARLIE: 'CHARLIE',
    CHARLIE_GEFANGEN: 'CHARLIE_GEFANGEN',
    DOPPELKOPF: 'DOPPELKOPF'
}

export type SopoType = ObjectValues<typeof SOPO_TYPE>