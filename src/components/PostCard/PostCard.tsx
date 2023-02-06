import React from "react";
import s from "./PostCard.module.scss"

interface IPostCard {
    title?: string;
    description?: string;
    imageSrc?: string;
    comments?: string[];
}

export const PostCard: React.FC<IPostCard> = ({title, description, imageSrc, comments}) => {
    return (
        <div className={s.post__card}>
            <p className={s.post__card__title}>
            
            </p>
            <p className={s.post__card__description}>
            
            </p>
            {imageSrc && <img src={imageSrc} alt="post image"/>}

            <span>Likes count</span>
            <span>Subscribe</span>
            <span>Comments</span>
        </div>
    )
}