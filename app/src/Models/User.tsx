export type Address = {
    StreetAddress?: string;
    City?: string;
    PostalCode?: string;
    Country?: string;
};

export type DateOfBirth = {
    year: number;
    month: number;
    day: number;
    dayOfWeek: string;
};

export type UserProfileToken = {
    username: string;
    email: string;
    token: string;
    firstName?: string;
    lastName?: string;
    gender?: number;
    dateOfBirth?: DateOfBirth;
    address?: Address;
    phone?: string;
    photo?: string;
    bio?: string;
    formBackgroundUrl?: string;
};




export type UserProfile = {
    userName: string;
    email: string;
};