import React from "react";
import {Link} from "react-router-dom";
import { VscHome, VscMail } from "react-icons/vsc";
import { CiBullhorn, CiViewList } from "react-icons/ci";
import s from "./Navbar.module.scss";


const Navbar: React.FC = () => {
    return (
        <nav className={s.navbar}>
            <ul className={s.navbar__list}>
                <li className={s.navbar__list__item}>
                    <Link to={"/2"}>
                        <div className={s.navbar__list__item__icon}>
                            <VscHome size={35}/>
                        </div>
                        {/* <span c>Моя страница</span> */}
                        Моя страница
                    </Link>
                </li>
                <li className={s.navbar__list__item}>
                    <Link to={"/posts"}>
                        <div className={s.navbar__list__item__icon}>
                            <CiViewList size={35}/>
                        </div>
                        Посты
                    </Link>
                </li>
                <li className={s.navbar__list__item}>
                    <Link to={"/chat"}>
                        <div className={s.navbar__list__item__icon}>
                            <VscMail size={35}/>
                        </div>
                        Чат
                    </Link>
                </li>
                <li className={s.navbar__list__item}>
                    <Link to={"/notify"}>
                        <div className={s.navbar__list__item__icon}>
                            <CiBullhorn size={35}/>
                        </div>
                        Оповещания
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export {Navbar};