import React from 'react';
import { UserPhoto } from '../../utils/UserPhoto/UserPhoto';
import { IUserDataInitialState } from '../../types/types';
import { CiEdit } from 'react-icons/ci';
// import ava from './photo.jpg';
import s from './SectionProfile.module.scss';
import { Link } from 'react-router-dom';



const SectionProfile: React.FC<IUserDataInitialState> = ({ userId, imageSrc, gender, firstName, birthday, email }) => {

    const localUserId = +localStorage.getItem('user_id')!
    return (
        <section className={s.profile}>
            <div className={s.profile__avatar}>
                {/* <div className={s.profile__avatar__wrapper}> */}
                {/* photo */}
                <UserPhoto imageSrc={imageSrc} genderId={gender} />

                {/* </div> */}
            </div>
            <div className={s.profile__info}>
                <h3 className={s.profile__info__name}>
                    {firstName}
                </h3>
                <div className={s.profile__info_item}>
                    <p>Дата рождения:</p>
                    <p>{birthday && birthday}</p>
                </div>
                <div className={s.profile__info_item}>
                    <p>Email:</p>
                    <p>{email && email}</p>
                </div>
            </div>
            <div className={s.profile__edit}>
                {localUserId === userId ?
                    (
                        <Link to={'/edit'}>
                            <CiEdit className={s.profile__icon} size={30} title='Редактировать профиль' />
                        </Link>
                    ) : null}
            </div>
        </section>
    );
};

export { SectionProfile };