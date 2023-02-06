import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { UserPhoto } from "../../../utils/UserPhoto/UserPhoto";
import { Button } from "../../../utils/Button/Button";
import { logOutAsync } from "../../../redux/AuthReducer";
import s from "../Header.module.scss";
// import ava from "../../SectionProfile/photo.jpg";





export const NavProfile = () => {
    
    // const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // const accessToken = useAppSelector(state => state.auth.accessToken);
    const refreshToken = useAppSelector(state => state.auth.refreshToken);

    
    const imageSrc = useAppSelector(state => state.user.imageSrc)
    const genderId = useAppSelector(state => state.user.genderId)

    // console.log(accessToken, '- accessToken')
    // console.log(refreshToken, '- refreshToken')
    const logOut = () => {
        // dispatch(setTokens({accessToken: '', refreshToken: ''}))
        dispatch(logOutAsync(refreshToken))
        
        localStorage.removeItem('access-token')
        localStorage.removeItem('refresh-token')
        
    }
return (
    <div className={s.nav__profile}>
        <div className={s.nav__profile__photo}>
            {/* Profile photo */}
            <UserPhoto imageSrc={imageSrc} genderId={genderId}/>
        </div>
        <Button onClick={logOut}>Выйти</Button>
    </div>
    )
}