import React, { useState, useEffect } from 'react';
import { Form } from '../../utils/Form/Form';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../../utils/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Error } from '../../utils/Error/Error';
import { IFormRegistration, IFormRegistrationDto } from '../../types/types';
import { authApi, instanceAxios, } from '../../api/axiosApi';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { cleanError, setError, setLoadingOff, setLoadingOn } from '../../redux/RegistrationReducer';
import './RegistrationPage.scss';
import axios, { AxiosError } from 'axios';
import { setAuth } from '../../redux/AuthReducer';

const RegistrationPage: React.FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormRegistration>({ mode: 'onChange' });

  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector((state) => state.registration.isLoading);
  const error = useAppSelector((state) => state.registration.error);
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const onSubmit: SubmitHandler<IFormRegistration> = async (data) => {
    if (error) dispatch(cleanError());

    if (data.password === data.passwordConfirm) {
      setIsPasswordMatch(true);

      dispatch(setLoadingOn());

      try {
        const dto: IFormRegistrationDto = {
          firstName: data.firstName,
          birthday: data.birthday.toISOString().split('T')[0],
          email: data.email,
          gender: +data.gender,
          password: data.password
        };
        const resData = await authApi.registration(dto);

        if (resData.status === 200) {
          reset();
          navigate('/login');
        }

      } catch (e) {
        if (axios.isAxiosError(e)) {
          console.log('e >', e);
          dispatch(setError(e.message));
        }
      } finally {
        dispatch(setLoadingOff());
      }

    } else {
      setIsPasswordMatch(false);
    }
  };
  const getErrorPassword = (message: string | undefined) => {
    if (message) {
      return message;
    }
    if (!isPasswordMatch) {
      return 'Пароли не совпадают';
    }
  };

  useEffect(() => {

    const userId = localStorage.getItem('user_id');
    const accessTok = localStorage.getItem('access-token');
    const refreshTok = localStorage.getItem('refresh-token');

    if (isAuth && (userId && accessTok && refreshTok)) {
      navigate(`/${userId}`);
      console.log('Registrationpage navigate to userId, if isAuth');
      return;
    }

    if (!isAuth && (userId && accessTok && refreshTok)) {
      instanceAxios.defaults.headers['Authorization'] = `Bearer ${accessTok}`;

      dispatch(setAuth(true));
      console.log('Registrationpage set axios.headers, if not isAuth');
      return;
    }

  }, [isAuth, navigate, dispatch]);

  return (
    <Form title={'Регистрация'}>
      <form onSubmit={handleSubmit(onSubmit)} className='form__registration'>
        <div className='block__input'>
          <label htmlFor={'firstName'} className={'input__title'}>
            Имя
            <input
              {...register('firstName', {
                required: 'Поле обязательно',
                minLength: {
                  value: 2,
                  message: 'Минимальная длина 2 символа ',
                },
                maxLength: {
                  value: 30,
                  message: 'Максимальная длина 30 символов',
                },
                pattern: {
                  value: /^([^0-9]*)$/,
                  message: 'Не может быть числом',
                },
              })}
              id={'firstName'}
              placeholder={'Введите ваше имя'}
              className='custom__input'
            />
            {errors?.firstName && <Error>{errors.firstName.message}</Error>}
          </label>
        </div>
        <div className='block__input'>
          <label htmlFor={'birthday'} className={'input__title'}>
            Дата рождения
            <input
              {...register('birthday', {
                valueAsDate: true,
                required: 'Обязательное поле',
              })}
              id={'birthday'}
              className='custom__input'
              type='date'
            />
            {errors?.birthday && <Error>{errors.birthday.message}</Error>}
          </label>
        </div>
        <div className='block__input'>
          <label htmlFor={'email'} className={'input__title'}>
            Email
            <input
              {...register('email', {
                required: 'Поле обязательно',
                maxLength: {
                  value: 30,
                  message: 'Максимальная длина 30 символов',
                },
                pattern: {
                  value: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                  message: 'Неверный email',
                },
              })}
              id={'email'}
              placeholder={'Введите ваш email'}
              className='custom__input'
            />
            {errors?.email && <Error>{errors.email.message}</Error>}
          </label>
        </div>
        <div className='block__input'>
          <label htmlFor={'gender'} className={'input__title'}>
            Пол
            <select defaultValue={1} {...register('gender')}>
              <option value={1}>Муж</option>
              <option value={2}>Жен</option>
            </select>
            {errors?.email && <Error>{errors.email.message}</Error>}
          </label>
        </div>
        <div className='block__input'>
          <label htmlFor={'password'} className={'input__title'}>
            Пароль
            <input
              {...register('password', {
                required: 'Поле обязательно',
                minLength: {
                  value: 8,
                  message: ' Минимальная длина 8 символов',
                },
                maxLength: {
                  value: 30,
                  message: 'Максимальная длина 30 символов',
                },
              })}
              id={'password'}
              placeholder={'Введите ваш пароль'}
              className='custom__input'
              type='password'
            />
            <Error>{getErrorPassword(errors?.password?.message)}</Error>
          </label>
        </div>
        <div className='block__input'>
          <label htmlFor={'passwordConfirm'} className={'input__title'}>
            Подтвердите пароль
            <input
              {...register('passwordConfirm', {
                required: 'Поле обязательно',
                minLength: {
                  value: 8,
                  message: ' Минимальная длина 8 символов',
                },
                maxLength: {
                  value: 30,
                  message: 'Максимальная длина 30 символов',
                },
              })}
              id={'passwordConfirm'}
              placeholder={'Подтвердите ваш пароль'}
              className='custom__input'
              type='password'
            />
            <Error>{getErrorPassword(errors.passwordConfirm?.message)}</Error>
          </label>
        </div>
        <Button disabled={isLoading} type='submit'>
          Зарегистрироваться
        </Button>
        {error && <Error>{error}</Error>}
        <p>У вас уже есть аккаунт ?</p>
        <p>
          войти можно <Link to={'/login'}>здесь !</Link>
        </p>
      </form>
    </Form>
  );
};

export { RegistrationPage };
