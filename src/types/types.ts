

export interface IFormLogin {
    login: string | number;
    password: string | number;
}
export interface IFormRegistrarion {
    firstName: string;
    lastName: string;
    patronymic: string;
    phoneNumber: string;
    birthday: Date;
    email: string;
    login: string;
    password: string | number;
    passwordConfirm: string | number;
}

export interface IUserDataInitialState {
    isLoading?: boolean;
    errorMessage?: string; 

    id: number | null,
    lastName: string | null,
    firstName: string | null,
    patronymic?: string | null,
    birthday?: string | null,
    genderId?: number | null,
    phoneNumber?: string | null,
    lastActivity: string | null,
    deletedAt?: string | null,

    imageSrc?: string | null;
}