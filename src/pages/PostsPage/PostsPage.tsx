import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { filesApi, instanceAxios, postsApi } from '../../api/axiosApi';
import { setAuth } from '../../redux/AuthReducer';
import { isAxiosError } from 'axios';
import { PostCard } from '../../components/PostCard/PostCard';
import s from './PostsPage.module.scss';
import type { AddCommentAnswerReduxType, CommentDto, CommentDtoPaginationResult, Post, PostDto, RemoveCommentAnswerReduxType, RemoveCommentReduxType, UpdateCommentAnswerReduxType, onDownloadAnswersReduxType } from '../../types/types';
import { addCommentAnswerRedux, addCommentRedux, changeLikeIntoPost, cleanPostsData, getPosts, incrementCountViewsRedux, onDeletePostAsync, onDownloadAnswersRedux, onUploadCommentRedux, removeCommentAnswerRedux, removeCommentRedux, updateCommentAnserRedux, updateCommentRedux, updatePost } from '../../redux/PostsPageReducer';

const PostsPage: React.FC = () => {



  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const postsPage = useAppSelector(state => state.postsPage);
  const isLoading = useAppSelector(state => state.postsPage.isLoading);
  const errorMessage = useAppSelector(state => state.postsPage.error);
  const isAuth = useAppSelector(state => state.auth.isAuth);

  const location = useLocation()


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

      dispatch(onDeletePostAsync({ postId, fileId }));

    } catch (er) {
      if (isAxiosError(er)) console.log('delete post er', er);
    }
  };

  const onUpdatePost = (data: PostDto) => dispatch(updatePost(data));
  const addComment = (dto: CommentDto) => dispatch(addCommentRedux(dto));
  const changeLike = (postId: number) => dispatch(changeLikeIntoPost(postId));
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
      console.log('Postspage redirect to login, if not isAuth');
      navigate('/login')
      return;
    }

    if (!isAuth && (userId && accessTok && refreshTok)) {
      instanceAxios.defaults.headers['Authorization'] = `Bearer ${accessTok}`;

      dispatch(setAuth(true));
      console.log('Postspage set axios.headers, if not isAuth');
      return;
    }


  }, [isAuth, dispatch, navigate]);


  useEffect(() => {
    console.log("запрос первой страницы")
    dispatch(cleanPostsData());
    dispatch(getPosts(1));

  }, [location, dispatch])

  useEffect(() => {

    if (postsPage.currentPage === 0) return;

    const root = document.getElementById(`page_uploading`)

    if (!root) return;

    const scrollHandler = () => {
      console.log("upload posts", postsPage.currentPage + 1)
      if ((document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 200) && !postsPage.isUploading && (postsPage.currentPage !== postsPage.pagesCount)) {
        dispatch(getPosts(postsPage.currentPage + 1));
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
  }, [postsPage.pagesCount, postsPage.currentPage, dispatch])

  return (
    <>
      {isLoading ? (
        <p>Loading.....</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <>
          <div className={s.posts}>

            {postsPage.posts && postsPage.posts?.length ? postsPage.posts?.map(post => <PostCard
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

            {postsPage.isUploading ? (
              <p>Загрузка постов</p>
            ) : postsPage.currentPage !== postsPage.pagesCount ? (
              <p id={`page_uploading`}>Прокрутите ниже</p>
            ) : null}
          </div>

        </>
      )}
    </>
  );
};

export default PostsPage;
