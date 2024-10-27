export const PARTY = {
    RE: 'RE',
    CONTRA: 'CONTRA',
    INAKTIV: 'INAKTIV'
}

type ObjectValues<T> = T[keyof T];
export type Party = ObjectValues<typeof PARTY>

