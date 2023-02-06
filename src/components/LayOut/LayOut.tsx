import React, { useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { useAppSelector } from "../../hooks/hooks";
import {useNavigate, Outlet} from "react-router-dom";
import s from "./LayOut.module.scss";

const LayOut = () => {

    const navigate = useNavigate();

    const token = useAppSelector(state => state.auth.token)

    useEffect(() => {
        if(!token) {
            navigate("/login")
        } 
    }, [token])

    return (
        <div className={s.layout}>
            <Header/>
            <div className={s.layout__container}>  
                <Navbar/>
                <main className={s.main}>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}


export default LayOut;