import React, { useEffect } from 'react';
import { Header } from '../../components/Header/Header';
import { Navbar } from '../../components/Navbar/Navbar';
import { useAppSelector } from '../../hooks/hooks';
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import s from './LayOut.module.scss';

const LayOut = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const isAuth = useAppSelector(state => state.auth.isAuth);

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        console.log('location', location, window.location)
        if (!isAuth && location.pathname === '/' && userId) {
            console.log('Layout redirect to MyPage, if not isAuth');
            navigate(`/${userId}`);
        }
        if (!isAuth && location.pathname === '/' && !userId) {
            console.log('Layout redirect to login, if not isAuth');
            navigate(`/login`);
        }
    }, [isAuth, location, navigate, dispatch]);

    return (
        <div className={s.layout}>
            <Header />
            <div id='copy' className={s.layout__copy}>Успешно сохранено</div>
            <div className={s.layout__container}>
                <Navbar />
                <main className={s.main}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};


export default LayOut;