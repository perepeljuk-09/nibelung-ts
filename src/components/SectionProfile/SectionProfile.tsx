import React from "react";
import { UserPhoto } from "../../utils/UserPhoto/UserPhoto";
import { IUserDataInitialState } from "../../types/types"
// import ava from "./photo.jpg";
import s from "./SectionProfile.module.scss";



const SectionProfile: React.FC<IUserDataInitialState> = ({imageSrc, genderId, firstName, lastName, birthday}) => {

    return (
        <section className={s.profile}>
            <div className={s.profile__avatar}>
                {/* <div className={s.profile__avatar__wrapper}> */}
                    {/* photo */}
                    <UserPhoto imageSrc={imageSrc} genderId={genderId}/>
                    
                {/* </div> */}
            </div>
            <div className={s.profile__info}>
                <h3 className={s.profile__info__name}>
                    {firstName} {lastName}
                </h3>
                <p>Дата рождения</p>
                <p>{birthday}</p>
            </div>
        </section>
    )
}

export {SectionProfile};