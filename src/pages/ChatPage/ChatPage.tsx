import React from "react";
import {useNavigate} from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

const ChatPage: React.FC = () => {

    const navigate = useNavigate();

    const token = useAppSelector(state => state.auth.token)

    // if(!token) {
    //     navigate("/login")
    // }

    return (
        <div> CHAT PAGE</div>
    )
}

export default ChatPage;