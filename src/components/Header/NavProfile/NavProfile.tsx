import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { UserPhoto } from '../../../utils/UserPhoto/UserPhoto';
import { Button } from '../../../utils/Button/Button';
import { logOutAsync, setAuth } from '../../../redux/AuthReducer';
import s from '../Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { cleanUserData } from '../../../redux/UserReducer';
// import ava from '../../SectionProfile/photo.jpg';





export const NavProfile = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();



    const imageSrc = useAppSelector(state => state.user.imageSrc);
    const genderId = useAppSelector(state => state.user.gender);

    const logOut = () => {
        const refreshToken = localStorage.getItem('refresh-token');

        if (refreshToken) dispatch(logOutAsync(refreshToken));

        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
        localStorage.removeItem('user_id');

        dispatch(cleanUserData());
        dispatch(setAuth(false));
        navigate('/login');

    };
    return (
        <div className={s.nav__profile}>
            <div className={s.nav__profile__photo}>
                {/* Profile photo */}
                <UserPhoto imageSrc={imageSrc} genderId={genderId} />
            </div>
            <Button onClick={logOut}>Выйти</Button>
        </div>
    );
};