

export interface IFormLogin {
    login: string | number;
    password: string | number;
}
export interface IFormRegistrarion {
    firstName: string;
    lastName: string;
    patronymic: string;
    date: Date;
    email: string;
    loginReg: string;
    password: string | number;
    passwordConfirm: string | number;
}