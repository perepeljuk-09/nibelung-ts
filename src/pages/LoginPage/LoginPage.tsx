import { useEffect } from 'react';
import { Form } from '../../utils/Form/Form';
import { Button } from '../../utils/Button/Button';
import { Link } from 'react-router-dom';
import { Error } from '../../utils/Error/Error';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  setLoadingOn,
  setLoadingOff,
  setError,
  setAuth,
} from '../../redux/AuthReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { IFormLogin } from '../../types/types';
import { authApi, instanceAxios } from '../../api/axiosApi';
import { setUserId } from '../../redux/UserReducer';
import jwt_decode from 'jwt-decode';
import './LoginPage.scss';
import { isAxiosError } from 'axios';

type JwtToken = {
  user_id: string;
  exp: number;
};
type JwtTokenUserData = {
  UserId: number;
}


const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLogin>({ mode: 'onChange' });

  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const error = useAppSelector((state) => state.auth.error);
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const id = useAppSelector((state) => state.user.userId);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IFormLogin> = async (data) => {
    dispatch(setLoadingOn());
    try {
      const response = await authApi.login(data);
      if (response.status === 200) {
        let decode = jwt_decode(response.data.accessToken) as JwtToken;
        let objDecode = JSON.parse(decode.user_id) as JwtTokenUserData;

        localStorage.setItem('access-token', response.data.accessToken);
        localStorage.setItem('refresh-token', response.data.refreshToken);
        localStorage.setItem('user_id', String(objDecode.UserId));
        instanceAxios.defaults.headers[
          'Authorization'
        ] = `Bearer ${response.data.accessToken}`;

        dispatch(setAuth(true));
        //dispatch(setUserId(objDecode.UserId));
        //reset();
      }

      console.log('response >>>', response);
    } catch (err) {
      if (isAxiosError(err)) {
        console.warn(err);
        if (err.response?.data) dispatch(setError(err.response.data));
        else dispatch(setError(err.message));

      }
    } finally {
      dispatch(setLoadingOff());
    }
  };

  useEffect(() => {

    const userId = localStorage.getItem('user_id');
    const accessTok = localStorage.getItem('access-token');
    const refreshTok = localStorage.getItem('refresh-token');

    if (isAuth && (userId && accessTok && refreshTok)) {
      navigate(`/${userId}`);
      console.log('Loginpage navigate to userId, if isAuth');
      return;
    }

    if (!isAuth && (userId && accessTok && refreshTok)) {
      instanceAxios.defaults.headers['Authorization'] = `Bearer ${accessTok}`;

      dispatch(setAuth(true));
      console.log('LoginPage set axios.headers, if not isAuth');
      return;
    }

  }, [isAuth, navigate, dispatch]);

  return (
    <>
      <Form title={'Войти'}>
        <form onSubmit={handleSubmit(onSubmit)} className='form__login'>
          <div className='block__input'>
            <label htmlFor={'login'} className={'input__title'}>
              Логин
              <input
                {...register('login', {
                  required: 'Поле обязательно',
                })}
                id={'login'}
                placeholder={'Введите ваш логин'}
                className='custom__input'
              />
              {errors?.login && <Error>{errors.login.message}</Error>}
            </label>
          </div>
          <div className='block__input'>
            <label htmlFor={'password'} className={'input__title'}>
              Пароль
              <input
                {...register('password', {
                  required: 'Поле обязательно',
                })}
                id={'password'}
                placeholder={'Введите ваш пароль'}
                className='custom__input'
                type='password'
              />
              {errors?.password && <Error>{errors.password.message}</Error>}
            </label>
          </div>
          <Button disabled={isLoading} type='submit'>
            Войти
          </Button>
          {error && <Error>{error}</Error>}
          <p>Если у вас нет аккаунта,</p>
          <p>
            вы можете зарегистрироваться{' '}
            <Link to={'/registration'}>здесь !</Link>
          </p>
        </form>
      </Form>
    </>
  );
};
export { LoginPage };