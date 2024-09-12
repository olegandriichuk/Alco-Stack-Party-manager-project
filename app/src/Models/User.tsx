export type Address = {
    streetAddress?: string;
    city?: string;
    postalCode?: string;
    country?: string;
};

export type UserProfileToken = {
    userName: string;
    email: string;
    token: string;
    firstName?: string;
    lastName?: string;
    gender?: number;
    dateOfBirth?: string;
    address?: Address;
    phoneNumber?: string;
    photo?: string;
    bio?: string;
    formBackgroundUrl?: string;
};




export type UserProfile = {
    userName: string;
    email: string;
    firstName?: string;
    lastName?: string;
    gender?: number;
    dateOfBirth?: string | null;
    address?: Address;
    phoneNumber?: string;
    photo?: string;
    bio?: string;
    formBackgroundUrl?: string;
};

export type UserPhoto = {
    photo?: string;
    formBackgroundUrl?: string;
};
