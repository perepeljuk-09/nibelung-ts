import React from "react";
import { PostCard } from "../../components/PostCard/PostCard";
import { SectionProfile } from "../../components/SectionProfile/SectionProfile";
import {useParams} from "react-router-dom";
import s from "./MyPage.module.scss";
import { useAppSelector } from "../../hooks/hooks";


const MyPage: React.FC = () => {

    const params = useParams()
    console.log(params)

    const userData = useAppSelector(state => state.user)
    // useEffect with request for data of User

    //access token in header with id

    // useEffect(() => {
        
    // },[])
    
    return (
        <>
            <SectionProfile {...userData}/>
                <div className={s.post__input}>

                <input   type="text" />
                </div>
            <PostCard/>

            {/* posts */}


        </>
    )
}

export default MyPage;