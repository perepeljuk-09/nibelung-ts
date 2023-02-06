import React from "react";
import {useNavigate} from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

const NotifyPage: React.FC = () => {

    const navigate = useNavigate();

    const token = useAppSelector(state => state.auth.token)

    // if(!token) {
    //     navigate("/login")
    // }


    return (
        <div> Notify PAGE</div>
    )
}

export default NotifyPage;