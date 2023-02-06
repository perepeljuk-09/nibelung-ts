import { useEffect } from 'react';
import {Form} from "../../utils/Form/Form";
import {Button} from "../../utils/Button/Button";
import {Link} from "react-router-dom"
import {Error} from "../../utils/Error/Error";
import {useForm, SubmitHandler} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import { setTokens, setLoadingOn, setLoadingOff } from '../../redux/AuthReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {IFormLogin} from "../../types/types";
import {authApi, instanceAxios} from "../../api/axiosApi";
import {getUserData} from "../../redux/UserReducer";
import jwt_decode from "jwt-decode";
import "./LoginPage.module.scss"

type JWTTOKEN = {
    sub: string;
    exp: number;
}

const LoginPage = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<IFormLogin>({mode: "onChange"});

    const accessToken = useAppSelector(state => state.auth.accessToken);
    const isLoading = useAppSelector(state => state.auth.isLoading)
    const id = useAppSelector(state => state.user.id)

    const navigate = useNavigate();
    const dispatch = useAppDispatch()


   

    const onSubmit: SubmitHandler<IFormLogin> = (data) => {
        dispatch(setLoadingOn())
        authApi.login(data)
            .then(res => {
            if(res.status === 200) {
                    let decode = jwt_decode(res.data.data.accessToken) as JWTTOKEN
                    let objDecode = JSON.parse(decode.sub) 
                    
                    dispatch(setTokens(res.data.data))
                    localStorage.setItem('access-token', res.data.data.accessToken)
                    localStorage.setItem('refresh-token', res.data.data.refreshToken)
                    instanceAxios.defaults.headers['Authorization'] = `Bearer ${res.data.data.accessToken}`
                    dispatch(getUserData(objDecode.UserId))
                    reset()
                    dispatch(setLoadingOff())

            }
        }).catch(er => {
            console.error(er)
        })
    }

    useEffect(() => {
        if(accessToken && id) {
            navigate(`/${id}`)
        }
    }, [accessToken, id, navigate])

return (
    <>
        <Form title={"Войти"}>
            <form onSubmit={handleSubmit(onSubmit)} className="form__registration">
                <div className="block__input">
                    <label htmlFor={"login"} className={"input__title"}>
                        Логин
                        <input {...register("login", {
                            required: "Поле обязательно"
                        })}
                               id={"login"}
                               placeholder={'Введите ваш логин'}
                               className="custom__input"/>
                        {errors?.login && <Error>{errors.login.message}</Error>}
                    </label>
                </div>
                <div className="block__input">
                    <label htmlFor={"password"} className={"input__title"}>
                        Пароль
                        <input {...register("password", {
                            required: "Поле обязательно"
                        })}
                               id={"password"}
                               placeholder={'Введите ваш пароль'}
                               className="custom__input"/>
                        {errors?.password && <Error>{errors.password.message}</Error>}
                    </label>
                </div>
                <Button disabled={isLoading} type="submit">Войти</Button>
                <p>Если у вас нет аккаунта,</p>
                <p>вы можете зарегистрироваться <Link to={'/registration'}>здесь !</Link></p>
            </form>
        </Form>
    </>
);
}
;

export {LoginPage};