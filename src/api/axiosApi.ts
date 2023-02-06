import axios from "axios";
import {IFormLogin, IFormRegistrarion} from "../types/types";

type responseType = {
    data: {
        accessToken: string;
        refreshToken: string;
    }
}
type registerType = {
        statusCode: number;
        statusName: string;
        message: string;
      }

export const instanceAxios = axios.create({
    baseURL: "http://192.168.1.4:1111/",
})


export const authApi = {
    login: (data: IFormLogin) => {
        // return object type of responseType
        return instanceAxios.post<responseType>('api/auth/authorize', data)
    },
    logout: (refreshToken: string) => {
        return instanceAxios.post(`api/auth/logout?refreshToken=${refreshToken}` )
    }
}

export const registrationApi = {
    registration(data: IFormRegistrarion) {
        return instanceAxios.post<registerType>('api/auth/register', data)
    }
}

export const userApi = {
    getUserData: (id: number) => {
        return instanceAxios.get(`api/users/${id}`)
    }
}