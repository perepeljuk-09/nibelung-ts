import React from 'react';
import { Logo } from '../../utils/Logo/Logo';
import { NavProfile } from './NavProfile/NavProfile';
import s from './Header.module.scss';

const Header: React.FC = () => {
    return (
        <header className={s.header}>
            <div className={s.header__container}>
                <Logo />
                <NavProfile />
            </div>
        </header>
    );
};

export { Header };