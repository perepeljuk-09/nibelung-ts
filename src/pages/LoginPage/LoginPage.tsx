import { useEffect } from 'react';
import {Form} from "../../utils/Form/Form";
import {Button} from "../../utils/Button/Button";
import {Link} from "react-router-dom"
import {Error} from "../../utils/Error/Error";
import {useForm, SubmitHandler} from "react-hook-form";
import axios, {AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";
import { setAuth, setLoadingOn, setLoadingOff } from '../../redux/AuthReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {IFormLogin} from "../../types/types";
import {authApi} from "../../api/axiosApi";
import "./LoginPage.module.scss"


const LoginPage = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<IFormLogin>({mode: "onChange"});

    const token = useAppSelector(state => state.auth.token);
    const isLoading = useAppSelector(state => state.auth.isLoading)
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const getToken = Promise.resolve()

   

    const onSubmit: SubmitHandler<IFormLogin> = (data) => {
        console.log(data)
        // axios.post("http://192.168.1.4:1111/api/auth/authorize", data).then( res => {
        dispatch(setLoadingOn())
        //authApi.login(data)
        // .then(res => {
            let res = {
                status: 200,
                data: {
                    token: 's'
                }
            }
            console.log(res)
            if(res.status === 200) {
                setTimeout(() => {

                    dispatch(setAuth(res.data.token))
                    reset()
                    dispatch(setLoadingOff())
                }, 2000)
            }
        // }).catch(er => {
        //     console.error(er)
        // })
    }

    useEffect(() => {
        if(token) {
            navigate('/1')
        }
    }, [token, navigate])

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