import React, { useEffect, useState, FormEvent } from 'react';
import { CiHeart, CiChat1, CiRead, CiCircleRemove, CiShare1, CiEdit, CiFileOn } from 'react-icons/ci';
import type { AddCommentAnswerReduxType, CommentDto, CommentDtoPaginationResult, Post, PostDto, RemoveCommentAnswerReduxType, RemoveCommentReduxType, UpdateCommentAnswerReduxType, onDownloadAnswersReduxType } from '../../types/types';
import { commentsApi, filesApi, postLikesApi, postsApi } from '../../api/axiosApi';
import { isAxiosError } from 'axios';
import { useAppDispatch } from '../../hooks/hooks';
import { Comment } from '../Comment/Comment';
import { CommentInput } from '../CommentInput/CommentInput';
import { Link } from 'react-router-dom';
import s from './PostCard.module.scss';

type PostCardProps = {
    onDeletePost: (postId: number, fileId: string) => void;
    onUpdatePost: (post: PostDto) => void;
    addCommentRedux: (dto: CommentDto) => void;
    changeLikeRedux: (postId: number) => void;


    onRemoveCommentRedux: (data: RemoveCommentReduxType) => void;
    onUpdateCommentRedux: (data: CommentDto) => void;
    onAddCommentAnswer: (data: AddCommentAnswerReduxType) => void;
    onRemoveCommentAnswerRedux: (data: RemoveCommentAnswerReduxType) => void;
    onUpdateCommentAnswerRedux: (data: UpdateCommentAnswerReduxType) => void;
    onDownloadAnswersRedux: (data: onDownloadAnswersReduxType) => void;
    onUploadCommentRedux: (data: CommentDtoPaginationResult) => void;
    incrementCountViewsRedux: (postId: number) => void;
} & Post;

export const PostCard: React.FC<PostCardProps> = ({
    authorId,
    addCommentRedux,
    onUpdatePost,
    changeLikeRedux,
    onRemoveCommentRedux,
    onUpdateCommentRedux,
    onAddCommentAnswer,
    onRemoveCommentAnswerRedux,
    onUpdateCommentAnswerRedux,
    onDownloadAnswersRedux,
    onUploadCommentRedux,
    incrementCountViewsRedux,
    authorFirstName,
    title,
    description,
    countViews,
    isLiked,
    fileId,
    commentsCount,
    likesCount,
    addedAt,
    comments,
    postId,
    updatedAt,
    currentPage,
    pagesCount,
    onDeletePost
}) => {

    const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(false);
    const [isDisabledBtnComm, setIsDisabledBtnComm] = useState<boolean>(false);

    const [content, setContent] = useState<string>('');


    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editTitle, setEditTitle] = useState<string>(title);
    const [editDescription, setEditDescription] = useState<string>(description);
    const [file, setFile] = useState<File | null>(null);

    const dispatch = useAppDispatch();
    const localUserId = +localStorage.getItem('user_id')!;


    const [image, setImage] = useState<string | null>(null);
    const [isUploadComment, setIsUploadComment] = useState<boolean>(false);

    const changeLike = async (isRequestDelete: boolean) => {
        setIsDisabledBtn(true);
        try {

            if (!isRequestDelete) {
                const response = await postLikesApi.addLike({ postId });
                console.log('add like reponse >', response);
                if (response.status === 200) {
                    changeLikeRedux(postId);
                }
            } else {
                const response = await postLikesApi.deleteLike(postId);
                console.log('remove like reponse >', response);
                if (response.status === 200) {
                    changeLikeRedux(postId)
                }
            }

        } catch (er) {
            if (isAxiosError(er)) console.log('er >', er);
        } finally {
            setIsDisabledBtn(false);
        }
    };

    const addComment = async () => {
        if (!content?.length) return;
        setIsDisabledBtnComm(true);
        try {

            const response = await commentsApi.addComment({ postId, content });
            if (response.status === 200)
                addCommentRedux(response.data)
            console.log('add comment', response.data)
            setContent('');

        } catch (er) {
            if (isAxiosError(er)) console.log(er);
        } finally {
            setIsDisabledBtnComm(false);
        }
    };

    const copyLink = async () => {
        try {
            navigator.clipboard.writeText(`${window.location.origin}/posts/${postId}`)
            const div = document.getElementById('copy')

            div!.style.display = 'block'

            setTimeout(() => {
                div!.style.display = 'none'
            }, 5000)

        } catch (er) {
            console.log(er)
        }
    }

    const onUploadComment = async () => {
        setIsUploadComment(true);
        try {
            const response = await commentsApi.getCommentsPagination(postId, currentPage + 1, comments[0].addedAt);
            console.log("загрузка комментарие", response.data)
            onUploadCommentRedux(response.data)

        } catch (e) {
            if (isAxiosError(e)) console.log(e)
        } finally {
            setIsUploadComment(false)
        }
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editTitle.length < 3) return;
        if (editDescription?.length < 10) return;

        try {

            if (file) {
                if (fileId) {
                    const res = await filesApi.deleteFile(fileId);
                }
                const r = await filesApi.uploadFile(file);
                const response = await postsApi.updatePost(postId, { description: editDescription, title: editTitle, fileId: r.data })
                console.log("Удаление старого файла, загрузка нового файла и обновление поста, с файлом");
                onUpdatePost(response.data);
            } else {
                const response = await postsApi.updatePost(postId, { description: editDescription, title: editTitle })
                onUpdatePost(response.data);
                console.log("обновление поста без файла");
                console.log(response);
            }
            setIsEdit(false);

        } catch (er) {
            if (isAxiosError(er)) console.log("error with update post");
        }
    };

    useEffect(() => {

        const GetData = async () => {
            if (!fileId) return;
            try {
                const r = await fetch(`https://localhost:7229/api/files/${fileId}`)
                console.log("r >", r)
                setImage(r.url)
            } catch (er) {
                console.log("img >", er)
            }
        }
        const IncrementCountViews = async () => {
            console.log("Увеличение просмотра", postId)
            try {
                const res = await postsApi.incrementCountViews(postId)
                incrementCountViewsRedux(postId)
            } catch (er) {
                console.log("incr >", er)
            }
        }

        const root = document.getElementById(`post_${postId}`)
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    GetData()
                    IncrementCountViews()
                    observer.unobserve(root!)
                }
            })

        }, { threshold: 0.5 })

        observer.observe(root!);
    }, [fileId])

    const AnswersCount = comments.reduce((prev, current) => prev += current.answersCount, 0)
    const ActualCount = comments.length + AnswersCount

    return (
        <div className={s.post__card} id={`post_${postId}`}>
            <div className={s.post__container}>
                <div className={s.post__header}>

                    <div className={s.post__control}>
                        <Link className={s.post__link} to={`/${authorId}`}>
                            <h3 className={s.post__author}>{authorFirstName}</h3>
                        </Link>
                        {localUserId === authorId && !isEdit ? (
                            <div className={s.post__btns}>
                                <button className={s.post__btn_edit} onClick={() => setIsEdit(true)}>
                                    <CiEdit className={s.post__edit} size={20} title='Редактировать комментарий' />
                                </button>
                                <button className={s.post__btn_edit}>
                                    <CiCircleRemove className={s.post__remove} title='Удалить' size={25} onClick={() => onDeletePost(postId, fileId)} />
                                </button>
                            </div>
                        )
                            : null}
                    </div>

                    {!isEdit ? (
                        <>
                            <p className={s.post__addedat}>{String(addedAt).split('T').join(' ').split('.')[0]}</p>

                            <h3 className={s.post__title}>{title}</h3>
                            {image ? <div className={s.post__box_img}>
                                <img className={s.post__img} src={image} alt='post imag' />
                            </div> : null}

                        </>
                    ) : null}
                </div>

                {!isEdit ? (
                    <>
                        <div className={s.post__description}>
                            {description}
                        </div>

                        <div className={s.post__footer}>
                            <button className={isLiked ? s.post__info_item_active : s.post__info_item} disabled={isDisabledBtn} onClick={() => changeLike(isLiked)}>
                                <CiHeart className={isLiked ? s.post__like_active : s.post__like} size={20} />
                                <span className={s.post__count}>{likesCount}</span>
                            </button>

                            <div className={s.post__info_item}>
                                <CiChat1 size={20} />
                                <span className={s.post__count}>{commentsCount}</span>
                            </div>

                            <div className={s.post__info_item} onClick={copyLink} title='Копировать ссылку на пост'>
                                <CiShare1 size={20} />
                            </div>

                            <div className={s.post__wathes}>
                                <CiRead size={20} />
                                <span className={s.post__count}>{countViews}</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <form className={s.post} onSubmit={onSubmit}>
                        <input className={s.post__input} type="text" placeholder='Новый заголовок......' value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                        <textarea className={s.post__textarea} placeholder='Новое описание.....' value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                        <div>
                            <button className={s.post__cancel} onClick={() => setIsEdit(false)} >Отменить</button>
                            <button className={s.post__confirm} type='submit'>Подтвердить изменение</button>
                            <label htmlFor="file__card" className={s.post__file}>
                                <CiFileOn size={20} title='Прикрепить новое изображение в пост' />
                                {file && file.name}
                            </label>
                            <input id='file__card' style={{ display: 'none' }} type="file" title='Прикрепить новый файл' onChange={(e) => setFile(e.target.files && e.target.files[0])} />
                        </div>
                    </form>
                )}


            </div>

            <div className={s.post__comments}>

                {comments && comments.length ? comments.map((com, index) => <Comment
                    key={com.id}
                    isLastItem={index === comments.length - 1}
                    {...com}
                    onRemoveCommentRedux={onRemoveCommentRedux}
                    onUpdateCommentRedux={onUpdateCommentRedux}
                    onAddCommentAnswer={onAddCommentAnswer}
                    onRemoveCommentAnswerRedux={onRemoveCommentAnswerRedux}
                    onUpdateCommentAnswerRedux={onUpdateCommentAnswerRedux}
                    onDownloadAnswersRedux={onDownloadAnswersRedux}
                />) : null}

                <div className={s.post__next}>
                    {commentsCount > ActualCount && !isUploadComment ? (
                        <button className={s.post__next_btn} onClick={onUploadComment}>следующие комментарии</button>
                    ) : isUploadComment ? (
                        <p>Загрузка.....</p>
                    ) : null}
                </div>

                <CommentInput
                    addComment={addComment}
                    content={content}
                    isDisabledBtn={isDisabledBtnComm}
                    placeholder='Написать комментарий...'
                    setContent={setContent}
                />

            </div>


        </div>
    );
};