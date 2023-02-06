import React from "react";
import s from "./Logo.module.scss";
import logo from "./logoIMG/logo.png";

const Logo: React.FC = () => {
    return (
        <div className={s.logo}>
            <div className={s.logo__icon}>
                <img src={logo} alt="main logo" />
            </div>
            <span className={s.logo__title}>Nibelung</span>
        </div>
    )
}

export {Logo};