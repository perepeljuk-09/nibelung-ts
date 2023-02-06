import axios, {AxiosResponse} from "axios";
import {IFormLogin, IFormRegistrarion} from "../types/types";

type responseType = {
    token: string;
}

const instanceAxios = axios.create({
    baseURL: "http://192.168.1.4:1111/api/",
})


export const authApi = {
    login: (data: IFormLogin) => {
        // return object type of responseType
        return instanceAxios.post<responseType>('auth/authorize', data)
    },
    logout: () => {
        return instanceAxios.post('', {})
    }
}

export const registrationApi = {
    registration(data: IFormRegistrarion) {

        // need URL

        return instanceAxios.post('', data)
    }
}