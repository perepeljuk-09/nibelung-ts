import React, { FormEvent, useEffect, useState } from 'react';
import { PostCard } from '../../components/PostCard/PostCard';
import { SectionProfile } from '../../components/SectionProfile/SectionProfile';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addCommentAnswerRedux, addCommentRedux, addPost, changeLikeIntoPostById, cleanUserData, deletePost, getUserData, getUserPosts, incrementCountViewsRedux, onDownloadAnswersRedux, onUploadCommentRedux, removeCommentAnswerRedux, removeCommentRedux, updateCommentAnserRedux, updateCommentRedux, updatePost } from '../../redux/UserReducer';
import { Button } from '../../utils/Button/Button';
import { CiFileOn } from 'react-icons/ci';
import { filesApi, instanceAxios, postsApi } from '../../api/axiosApi';
import { isAxiosError } from 'axios';
import { setAuth } from '../../redux/AuthReducer';
import type { AddCommentAnswerReduxType, CommentDto, CommentDtoPaginationResult, Post, PostDto, RemoveCommentAnswerReduxType, RemoveCommentReduxType, UpdateCommentAnswerReduxType, onDownloadAnswersReduxType } from '../../types/types';
import s from './MyPage.module.scss';


const MyPage: React.FC = () => {

    const params = useParams<{ id: string }>();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userData = useAppSelector(state => state.user);
    const userPosts = useAppSelector(state => state.user.posts);
    const isLoading = useAppSelector(state => state.user.isLoading);
    const errorMessage = useAppSelector(state => state.user.errorMessage);
    const isAuth = useAppSelector(state => state.auth.isAuth);

    const localUserId = +localStorage.getItem('user_id')!

    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [file, setFile] = useState<File | null>(null);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title || title?.length < 3) return;
        if (!description || description?.length < 10) return;

        try {
            if (file) {
                const response = await filesApi.uploadFile(file);
                if (response.status === 200) console.log('success uploadFile', response);

                const post = {
                    title,
                    description,
                    userId: localUserId,
                    fileId: response.data
                };
                const res = await postsApi.createPost(post);
                if (res.status === 200) {
                    console.log('success createPost', res);
                    dispatch(addPost(res.data));
                    setTitle('')
                    setDescription('')
                    setFile(null)
                }

            } else {
                const post = {
                    title,
                    description,
                    userId: localUserId
                };

                const res = await postsApi.createPost(post);
                if (res.status === 200) {
                    console.log('success createPost', res);
                    dispatch(addPost(res.data));
                    setTitle('')
                    setDescription('')
                    setFile(null)
                }

            }
        } catch (er) {
            console.log('er >', er);

        }
        console.log('file >>>', file);
    };

    const onDeletePost = async (postId: number, fileId?: string) => {
        try {

            if (fileId) {
                const res = await filesApi.deleteFile(fileId);
                if (res.status !== 200)
                    console.log('delete file not 200', res.status);

            }
            const response = await postsApi.deletePost(postId);

            if (response.status !== 200) {
                console.log('response not 200', response.status);
                return;
            }

            console.log('postId >', response.data,);

            dispatch(deletePost(postId));

        } catch (er) {
            if (isAxiosError(er)) console.log('delete post er', er);
        }
    };

    const onUpdatePost = (data: PostDto) => dispatch(updatePost(data));
    const addComment = (dto: CommentDto) => dispatch(addCommentRedux(dto));
    const changeLike = (postId: number) => dispatch(changeLikeIntoPostById(postId));
    const removeComment = (data: RemoveCommentReduxType) => dispatch(removeCommentRedux(data));
    const updateComment = (data: CommentDto) => dispatch(updateCommentRedux(data));
    const addCommentAnswer = (data: AddCommentAnswerReduxType) => dispatch(addCommentAnswerRedux(data));
    const removeCommentAnswer = (data: RemoveCommentAnswerReduxType) => dispatch(removeCommentAnswerRedux(data));
    const updateCommentAnswer = (data: UpdateCommentAnswerReduxType) => dispatch(updateCommentAnserRedux(data));
    const onDownloadAnswers = (data: onDownloadAnswersReduxType) => dispatch(onDownloadAnswersRedux(data));
    const onUploadComment = (data: CommentDtoPaginationResult) => dispatch(onUploadCommentRedux(data));
    const incrementCountViews = (postId: number) => dispatch(incrementCountViewsRedux(postId));

    const isDisabledBtn = () => !title || title?.length < 3 || !description || description?.length < 10;


    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        const accessTok = localStorage.getItem('access-token');
        const refreshTok = localStorage.getItem('refresh-token');

        if (!isAuth && !(userId && accessTok && refreshTok)) {
            console.log('MyPage redirect to login, if not isAuth');
            navigate('/login')
            return;
        }

        if (!isAuth && (userId && accessTok && refreshTok)) {
            instanceAxios.defaults.headers['Authorization'] = `Bearer ${accessTok}`;

            dispatch(setAuth(true));
            console.log('Mypage set axios.headers, if not isAuth');
            return;
        }

        if (!params.id) return;

        dispatch(getUserData(+params.id));
        dispatch(cleanUserData());
        dispatch(getUserPosts({ userId: +params.id, page: 1 }));


    }, [isAuth, params.id, dispatch, navigate]);



    useEffect(() => {

        const root = document.getElementById(`page_uploading`)

        if (!root) return;

        const scrollHandler = () => {
            console.log("upload posts", userData.currentPage + 1)
            if ((document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 200) && !userData.isUploading && (userData.currentPage !== userData.pagesCount)) {
                if (!params.id) return;
                dispatch(getUserPosts({ userId: +params.id, page: userData.currentPage + 1 }));
            }
        }

        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    scrollHandler()
                    observer.unobserve(root)
                }
            })

        }, { threshold: 1 })

        observer.observe(root);
    }, [userData.pagesCount, userData.currentPage])

    return (
        <>
            {isLoading ? (
                <p>Loading.....</p>
            ) : errorMessage ? (
                <p>{errorMessage}</p>
            ) : (
                <>
                    <SectionProfile {...userData} />
                    {localUserId === userData.userId ?
                        (
                            <form className={s.post} onSubmit={onSubmit}>
                                <input className={s.post__input} type="text" placeholder='Заголовок' value={title} onChange={(e) => setTitle(e.target.value)} />
                                <textarea className={s.post__textarea} placeholder='Что у вас нового ?' value={description} onChange={(e) => setDescription(e.target.value)} />
                                <div className={s.post__footer}>
                                    <Button style={{ marginBottom: '0', fontSize: '17px', width: '150px', borderRadius: '8px', padding: '5px 10px' }} disabled={isDisabledBtn()}>Опубликовать</Button>
                                    <label htmlFor="file" className={s.post__file}>
                                        <CiFileOn size={20} title='Прикрепить в пост изображение' />
                                        {file && file.name}
                                    </label>
                                    <input id='file' style={{ display: 'none' }} type="file" onChange={(e) => setFile(e.target.files && e.target.files[0])} />
                                </div>
                            </form>
                        ) : null}

                    <div className={s.posts}>

                        {userPosts && userPosts?.length ? userPosts?.map(post => <PostCard
                            key={post.postId}
                            {...post}
                            addCommentRedux={addComment}
                            onUpdatePost={onUpdatePost}
                            onDeletePost={onDeletePost}
                            changeLikeRedux={changeLike}
                            onRemoveCommentRedux={removeComment}
                            onUpdateCommentRedux={updateComment}
                            onAddCommentAnswer={addCommentAnswer}
                            onRemoveCommentAnswerRedux={removeCommentAnswer}
                            onUpdateCommentAnswerRedux={updateCommentAnswer}
                            onDownloadAnswersRedux={onDownloadAnswers}
                            onUploadCommentRedux={onUploadComment}
                            incrementCountViewsRedux={incrementCountViews}
                        />
                        ) : <p>Нет записей</p>}

                        {userData.isUploading ? (
                            <p>Загрузка постов</p>
                        ) : userData.currentPage !== userData.pagesCount ? (
                            <p id={`page_uploading`}>Прокрутите ниже</p>
                        ) : null}
                    </div>

                </>
            )}
        </>
    );
};

export default MyPage;