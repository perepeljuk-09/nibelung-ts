import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { FiArrowLeft } from 'react-icons/fi';
import s from './EditPage.module.scss';
import { Button } from '../../utils/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { userApi } from '../../api/axiosApi';
import { isAxiosError } from 'axios';

const EditPage: React.FC = () => {

    const navigate = useNavigate();

    const userId = useAppSelector(state => state.user.userId);
    const reduxFirstName = useAppSelector(state => state.user.firstName);
    const reduxbirthday = useAppSelector(state => state.user.birthday);
    const reduxGender = useAppSelector(state => state.user.gender);
    const reduxEmail = useAppSelector(state => state.user.email);

    const [firstName, setFirstName] = useState<string>(reduxFirstName ?? '');
    const [birthday, setBirthday] = useState<string>(reduxbirthday ?? '');
    const [gender, setGender] = useState<string>(String(reduxGender) ?? '1');
    const [email, setEmail] = useState<string>(reduxEmail ?? '');

    const OnUpdate = async () => {
        if (!userId) {
            console.log('C;annot do update userId without');
            return;
        }
        const data = {
            firstName,
            birthday,
            gender: Number(gender),
            email
        };
        console.log('data', data);
        try {
            const response = await userApi.updateUser(userId, data);
            if (response.status !== 200) {
                console.log('reponse.status', response.status);
                return;
            }

            navigate(`/${userId}`);

        } catch (er) {
            if (isAxiosError(er)) {
                console.log('er with update', er);
            }
        } finally {

        }
    };

    return (
        <div className={s.edit}>
            <Link to={`/${userId}`}>
                <FiArrowLeft className={s.edit__back} size={30} title='Назад' />
            </Link>
            <div className={s.edit__item}>
                <label className={s.edit__label} htmlFor="firstName">Имя:</label>
                <input className={s.edit__input} id='firstName' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className={s.edit__item}>
                <label className={s.edit__label} htmlFor="birthday">Дата рождения:</label>
                <input className={s.edit__input} id='birthday' type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
            </div>
            <div className={s.edit__item}>
                <label className={s.edit__label} htmlFor="gender">Пол:</label>
                <select className={s.edit__input} value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value={1}>Муж</option>
                    <option value={2}>Жен</option>
                </select>
            </div>
            <div className={s.edit__item}>
                <label className={s.edit__label} htmlFor="email">Email:</label>
                <input className={s.edit__input} id='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Button style={{ width: '20%' }} onClick={OnUpdate}>Обновить</Button>
        </div >
    );
};

export default EditPage;
