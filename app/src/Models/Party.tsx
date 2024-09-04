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
    name: string;
    description: string;
    date: string;
    createdByMe: boolean;
}
