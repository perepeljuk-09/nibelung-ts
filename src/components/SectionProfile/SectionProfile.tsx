import React from "react";
import ava from "./photo.jpg";
import s from "./SectionProfile.module.scss";

const SectionProfile: React.FC = () => {
    return (
        <section className={s.profile}>
            <div className={s.profile__avatar}>
                {/* <div className={s.profile__avatar__wrapper}> */}
                    {/* photo */}
                    <img src={ava} alt="anything photo" />
                    
                {/* </div> */}
            </div>
            <div className={s.profile__info}>
                <h3 className={s.profile__info__name}>
                    Имя Фамилия
                </h3>
                <p>Дата рождения</p>
            </div>
        </section>
    )
}

export {SectionProfile};