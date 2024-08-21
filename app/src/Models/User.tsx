export type Address = {
    Country?: string;
    Town?: string;
    Street?: string;
    ZipCode?: string;
};

export type RegisterFormsInputs = {
    email: string;
    userName: string;
    password: string;
    name: string;
    surname: string;
    phone: string;
    address: Address;
    photoUrl: string;
    formBackgroundUrl: string;
};


export type UserProfileToken = {
    userName: string;
    email: string;
    token: string;
    name?: string;
    Surname?: string;
    Phone?: string;
    Address?: Address;
    photoUrl?: string;
    formBackgroundUrl?: string;
};



export type UserProfile = {
    userName: string;
    email: string;
};