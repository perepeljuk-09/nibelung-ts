import React, {useState} from 'react';
import {Form} from "../../utils/Form/Form";
import {useForm, SubmitHandler} from "react-hook-form"
import {Button} from "../../utils/Button/Button";
import {Link, useNavigate} from "react-router-dom";
import {Error} from "../../utils/Error/Error";
import {IFormRegistrarion} from "../../types/types";
import {registrationApi} from "../../api/axiosApi";
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setLoadingOff, setLoadingOn } from '../../redux/RegistrationReducer';
import "./RegistrationPage.scss"


const RegistrationPage: React.FC = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<IFormRegistrarion>({mode: "onChange"});

    const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);

    const isLoading = useAppSelector(state => state.registration.isLoading)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<IFormRegistrarion> = (data) => {
        if (data.password === data.passwordConfirm) {
            setIsPasswordMatch(true)
            console.log(data)
            dispatch(setLoadingOn())
            // setTimeout(() => {

            //     dispatch(setLoadingOff())
            //     reset()
            //     navigate('/login')
            // }, 1000)
            registrationApi.registration(data).then(res => {
                if(res.status === 200) {
                    reset()
                    navigate('/login')
                }
            }).catch(e => {
                console.log(e)
            })
            dispatch(setLoadingOff())

        } else {
            setIsPasswordMatch(false)
        }
    }
    const getErrorPassword = (message: string | undefined) => {
        if (message) {
            return message
        }
        if (!isPasswordMatch) {
            return "Пароли не совпадают"
        }

    }

    return (
        <Form title={"Регистрация"}>
            <form onSubmit={handleSubmit(onSubmit)} className="form__registration">
                <div className="block__input">
                    <label htmlFor={"firstName"} className={"input__title"}>
                        Имя
                        <input {...register("firstName", {
                            required: "Поле обязательно",
                            minLength: {
                                value: 2,
                                message: "Минимальная длина 2 символа "
                            },
                            maxLength: {
                                value: 30,
                                message: "Максимальная длина 30 символов"
                            },
                            pattern: {
                                value: /^([^0-9]*)$/,
                                message: "Не может быть числом"
                            }
                        })}
                               id={"firstName"}
                               placeholder={'Введите ваше имя'}
                               className="custom__input"/>
                        {errors?.firstName && <Error>{errors.firstName.message}</Error>}
                    </label>
                </div>
                <div className="block__input">
                    <label htmlFor={"lastName"} className={"input__title"}>
                        Фамилия
                        <input {...register("lastName", {
                            required: "Поле обязательно",
                            minLength: {
                                value: 2,
                                message: "Минимальная длина 2 символа "
                            },
                            maxLength: {
                                value: 30,
                                message: "Максимальная длина 30 символов"
                            },
                            pattern: {
                                value: /^([^0-9]*)$/,
                                message: "Не может быть числом"
                            }
                        })}
                               id={"lastName"}
                               placeholder={'Введите вашу фамилию'}
                               className="custom__input"/>
                        {errors?.lastName && <Error>{errors.lastName.message}</Error>}
                    </label>
                </div>
                <div className="block__input">
                    <label htmlFor={"patronymic"} className={"input__title"}>
                        Отчество
                        <input {...register("patronymic")}
                               id={"patronymic"}
                               placeholder={'Введите ваше отчество'}
                               className="custom__input"/>
                        {errors?.patronymic && <Error>{errors.patronymic.message}</Error>}
                    </label>
                </div>
                <div className="block__input">
                    <label htmlFor={"phoneNumber"} className={"input__title"}>
                        Номер телефона
                        <input {...register("phoneNumber")}
                               id={"phoneNumber"}
                               placeholder={'Введите ваш номер телефона'}
                               className="custom__input"/>
                        {errors?.phoneNumber && <Error>{errors.phoneNumber.message}</Error>}
                    </label>
                </div>
                <div className="block__input">
                    <label htmlFor={"birthday"} className={"input__title"}>
                        Дата рождения
                        <input {...register("birthday", {
                            valueAsDate: true,
                            required: "Обязательное поле"
                        })}
                               id={"birthday"}
                               className="custom__input"
                               type="date"/>
                        {errors?.birthday && <Error>{errors.birthday.message}</Error>}
                    </label>
                </div>
                <div className="block__input">
                    <label htmlFor={"email"} className={"input__title"}>
                        Email
                        <input {...register("email", {
                            required: "Поле обязательно",
                            maxLength: {
                                value: 30,
                                message: "Максимальная длина 30 символов"
                            },
                            pattern: {
                                value: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                                message: "Неверный email"
                            }
                        })}
                               id={"email"}
                               placeholder={'Введите вашу email'}
                               className="custom__input"/>
                        {errors?.email && <Error>{errors.email.message}</Error>}
                    </label>
                </div>
                <div className="block__input">
                    <label htmlFor={"login"} className={"input__title"}>
                        Логин
                        <input {...register("login", {
                            required: "Поле обязательно",
                            maxLength: {
                                value: 30,
                                message: "Максимальная длина 30 символов"
                            }
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
                            required: "Поле обязательно",
                            minLength: {
                                value: 8,
                                message: " Минимальная длина 8 символов"
                            },
                            maxLength: {
                                value: 30,
                                message: "Максимальная длина 30 символов"
                            }
                        })}
                               id={"password"}
                               placeholder={'Введите ваш пароль'}
                               className="custom__input"/>
                    <Error>{getErrorPassword(errors?.password?.message)}</Error>
                    </label>
                </div>
                <div className="block__input">
                    <label htmlFor={"passwordConfirm"} className={"input__title"}>
                        Подтвердите пароль
                        <input {...register("passwordConfirm", {
                            required: "Поле обязательно",
                            minLength: {
                                value: 8,
                                message: " Минимальная длина 8 символов"
                            },
                            maxLength: {
                                value: 30,
                                message: "Максимальная длина 30 символов"
                            }
                        })}
                               id={"passwordConfirm"}
                               placeholder={'Подтвердите ваш пароль'}
                               className="custom__input"/>
                       <Error>{getErrorPassword(errors.passwordConfirm?.message)}</Error>
                    </label>
                </div>
                <Button disabled={isLoading} type="submit">Зарегистрироваться</Button>
                <p>У вас уже есть аккаунт ?</p>
                <p>войти можно <Link to={'/login'}>здесь !</Link></p>
            </form>
        </Form>
    );
};

export {RegistrationPage};