import React, { useEffect } from "react";
import { PostCard } from "../../components/PostCard/PostCard";
import { SectionProfile } from "../../components/SectionProfile/SectionProfile";
import s from "./MyPage.module.scss";


const MyPage: React.FC = () => {

    // useEffect with request for data of User

    return (
        <>
            <SectionProfile/>
            <div>

            <input type="text" />
            </div>

            {/* posts */}

            <PostCard/>

        </>
    )
}

export default MyPage;