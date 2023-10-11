import { useNavigate, useParams } from "react-router-dom";
import { PostCard } from "../../components/PostCard/PostCard";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect } from 'react';
import { addCommentAnswerRedux, addCommentRedux, changeLikeIntoPost, getPostByIdAsync, incrementCountViewsRedux, onDeletePostAsync, onDownloadAnswersRedux, onUploadCommentRedux, removeCommentAnswerRedux, removeCommentRedux, updateCommentAnserRedux, updateCommentRedux, updatePost } from "../../redux/PostPageReducer";
import { instanceAxios } from "../../api/axiosApi";
import { setAuth } from "../../redux/AuthReducer";
import type { AddCommentAnswerReduxType, CommentDto, CommentDtoPaginationResult, Post, PostDto, RemoveCommentAnswerReduxType, RemoveCommentReduxType, UpdateCommentAnswerReduxType, onDownloadAnswersReduxType } from "../../types/types";


const PostPage = () => {
    const params = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const postPageStore = useAppSelector(state => state.postPage);
    const isAuth = useAppSelector(state => state.auth.isAuth);

    const onUpdatePost = (data: PostDto) => dispatch(updatePost(data));
    const onDeletePost = (postId: number, fileId?: string) => dispatch(onDeletePostAsync({ postId, fileId }));
    const addComment = (dto: CommentDto) => dispatch(addCommentRedux(dto));
    const changeLike = (postId: number) => dispatch(changeLikeIntoPost());
    const removeComment = (data: RemoveCommentReduxType) => dispatch(removeCommentRedux(data));
    const updateComment = (data: CommentDto) => dispatch(updateCommentRedux(data));
    const addCommentAnswer = (data: AddCommentAnswerReduxType) => dispatch(addCommentAnswerRedux(data));
    const removeCommentAnswer = (data: RemoveCommentAnswerReduxType) => dispatch(removeCommentAnswerRedux(data));
    const updateCommentAnswer = (data: UpdateCommentAnswerReduxType) => dispatch(updateCommentAnserRedux(data));
    const onDownloadAnswers = (data: onDownloadAnswersReduxType) => dispatch(onDownloadAnswersRedux(data));
    const onUploadComment = (data: CommentDtoPaginationResult) => dispatch(onUploadCommentRedux(data));
    const incrementCountViews = (postId: number) => dispatch(incrementCountViewsRedux(postId));

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        const accessTok = localStorage.getItem('access-token');
        const refreshTok = localStorage.getItem('refresh-token');

        if (!isAuth && !(userId && accessTok && refreshTok)) {
            console.log('PostPage redirect to login, if not isAuth');
            navigate('/login')
            return;
        }

        if (!isAuth && (userId && accessTok && refreshTok)) {
            instanceAxios.defaults.headers['Authorization'] = `Bearer ${accessTok}`;

            dispatch(setAuth(true));
            console.log('Postpage set axios.headers, if not isAuth');
            return;
        }

        if (!params.id) return;

        dispatch(getPostByIdAsync(params.id))
    }, [params.id, dispatch, isAuth, navigate])

    return (
        <>
            {postPageStore.isLoading ? (
                <p>Loading........</p>
            ) : postPageStore.error ? (
                <p>{postPageStore.error}</p>
            ) : !postPageStore.post ? (
                <p>Данных нет</p>
            ) : (
                <PostCard
                    onUpdatePost={onUpdatePost}
                    onDeletePost={onDeletePost}
                    addCommentRedux={addComment}
                    changeLikeRedux={changeLike}
                    {...postPageStore.post}
                    onRemoveCommentRedux={removeComment}
                    onUpdateCommentRedux={updateComment}
                    onAddCommentAnswer={addCommentAnswer}
                    onRemoveCommentAnswerRedux={removeCommentAnswer}
                    onUpdateCommentAnswerRedux={updateCommentAnswer}
                    onDownloadAnswersRedux={onDownloadAnswers}
                    onUploadCommentRedux={onUploadComment}
                    incrementCountViewsRedux={incrementCountViews}
                />
            )}
        </>
    );
};

export default PostPage;