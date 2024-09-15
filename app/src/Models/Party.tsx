export type PartyPost = {
    name: string;
    description: string;
    date: string;
    photo: string;
    location: string;
    creatorUserName: string;
    token: string;
}

export type PartyListGet = {
    partyId: string;
    name: string;
    description: string;
    date: string;
    createdByMe: boolean;
}

export type PartyDetailGet = {
    name: string;
    description?: string;
    photo?: string;
    date: string;
    location?: string;
    liquors: boolean;
    lowAlcohol: boolean;
    midAlcohol: boolean;
    highAlcohol: boolean;
    rankLimit: number;
    createdByMe: boolean;
}
export type PartyDetailPut = {
    name: string;
    description?: string;
    photo?: string;
    date: string;
    location?: string;
    liquors: boolean;
    lowAlcohol: boolean;
    midAlcohol: boolean;
    highAlcohol: boolean;
    rankLimit: number;
}