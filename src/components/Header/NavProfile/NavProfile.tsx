import {useNavigate} from "react-router-dom";
import { setAuth } from "../../../redux/AuthReducer";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import s from "../Header.module.scss";
import axios from "axios";





export const NavProfile = () => {
    
    const navigate = useNavigate();

    const token = useAppSelector(state => state.auth.token);
    const dispatch = useAppDispatch();

    console.log(token, '- token')
    const logOut = () => {
        dispatch(setAuth(''))
        
        // axios.post()   
    }
return (
    <div className={s.nav__profile}>
        <div className={s.nav__profile__photo}>
            {/* Profile photo */}
        </div>
        <button onClick={logOut}>Выйти</button>
    </div>
    )
}