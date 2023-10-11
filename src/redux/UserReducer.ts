import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { AddCommentAnswerReduxType, CommentType, CommentDto, CommentDtoPaginationResult, IUserDataInitialState, Post, PostDto, PostDtoPaginationResult, RemoveCommentAnswerReduxType, RemoveCommentReduxType, UpdateCommentAnswerReduxType, UserDataType, getUserPostsType, onDownloadAnswersReduxType } from '../types/types';
import { authApi, instanceAxios, postsApi, userApi } from '../api/axiosApi';
import { AxiosError, isAxiosError } from 'axios';
import { setAuth } from './AuthReducer';

export const getUserData = createAsyncThunk(
    'get/userdata',
    async (id: number, ThunkAPI) => {
        try {
            console.log('userData request')
            const response = await userApi.getUserDataById(id);

            return response.data;
        } catch (e) {
            if (isAxiosError(e)) {
                if (e.response?.status === 404) return ThunkAPI.rejectWithValue(e);
                if (e.message === 'Network Error') {
                    console.log('userData failed with 401 error, will be  >>>', e);
                    const refresh = localStorage.getItem('refresh-token');
                    if (refresh) {
                        try {
                            const response = await authApi.refreshTokens(refresh);
                            console.log('Токены обновились');

                            localStorage.setItem('access-token', response.data.accessToken);
                            localStorage.setItem('refresh-token', response.data.refreshToken);

                            instanceAxios.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken}`;

                            console.log('userData request')
                            const res = await userApi.getUserDataById(id);
                            return res.data;

                        } catch (err) {
                            if (isAxiosError(err) && err.response?.status === 404) return ThunkAPI.rejectWithValue(err);

                            console.log('Токены не обновились, произошла ошибка, локалсторадж чистится и авторизация выключается');

                            localStorage.removeItem('access-token');
                            localStorage.removeItem('refresh-token');
                            localStorage.removeItem('user_id');

                            ThunkAPI.dispatch(setAuth(false));
                            return ThunkAPI.rejectWithValue(err)
                        }
                    } else return ThunkAPI.rejectWithValue(e)
                }
            }
        }

    });
export const getUserPosts = createAsyncThunk(
    'get/userposts',
    async (data: getUserPostsType, ThunkAPI) => {
        try {
            const response = await postsApi.getUserPostsByPage(data.userId, data.page);

            return response.data;
        } catch (e) {
            if (isAxiosError(e)) {
                if (e.response?.status === 404) return ThunkAPI.rejectWithValue(e);
                if (e.message === 'Network Error') {
                    console.log('userData failed with 401 error, will be  >>>', e);
                    const refresh = localStorage.getItem('refresh-token');
                    if (refresh) {
                        try {
                            const response = await authApi.refreshTokens(refresh);
                            console.log('Токены обновились');

                            localStorage.setItem('access-token', response.data.accessToken);
                            localStorage.setItem('refresh-token', response.data.refreshToken);

                            instanceAxios.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken}`;

                            console.log('userposts request')
                            const res = await postsApi.getUserPostsByPage(data.userId, data.page);
                            return res.data;

                        } catch (err) {
                            if (isAxiosError(err) && err.response?.status === 404) return ThunkAPI.rejectWithValue(err);

                            console.log('Токены не обновились, произошла ошибка, локалсторадж чистится и авторизация выключается');

                            localStorage.removeItem('access-token');
                            localStorage.removeItem('refresh-token');
                            localStorage.removeItem('user_id');

                            ThunkAPI.dispatch(setAuth(false));
                            return ThunkAPI.rejectWithValue(err)
                        }
                    } else return ThunkAPI.rejectWithValue(e)
                }
            }
        }

    });


const initialState: IUserDataInitialState = {
    userId: null,
    firstName: null,
    birthday: null,
    email: null,
    gender: null,
    addedAt: null,
    updatedAt: null,
    posts: [],
    currentPage: 1,
    pagesCount: 0,
    pageSize: 0,
    totalCountItems: 0,
    isUploading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserId: (state, action: PayloadAction<number>) => {
            state.userId = action.payload;
        },
        cleanUserData: (state) => {
            state.userId = null;
            state.firstName = null;
            state.birthday = null;
            state.email = null;
            state.gender = null;
            state.addedAt = null;
            state.updatedAt = null;
            state.currentPage = 1;
            state.pagesCount = 0;
            state.pageSize = 0;
            state.totalCountItems = 0;
            state.posts = [];
        },
        deletePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts?.filter(post => post.postId !== action.payload);
        },
        updatePost: (state, action: PayloadAction<PostDto>) => {
            state.posts = state.posts?.map(post => post.postId === action.payload.postId ? { ...action.payload, comments: post.comments } : post)
        },
        addPost: (state, action: PayloadAction<PostDto>) => {
            state.posts?.unshift({ ...action.payload, comments: [] });
        },
        changeLikeIntoPostById: (state, action: PayloadAction<number>) => {
            state.posts = state.posts?.map(post => post.postId === action.payload ? { ...post, isLiked: !post.isLiked, likesCount: !post.isLiked ? ++post.likesCount : --post.likesCount } : post);
        },
        addCommentRedux: (state, action: PayloadAction<CommentDto>) => {
            const post = state.posts?.find(post => post.postId === action.payload.postId);
            post!.comments.push({ ...action.payload, answers: [] })
            post!.commentsCount = ++post!.commentsCount
        },
        updateCommentRedux: (state, action: PayloadAction<CommentDto>) => {
            const post = state.posts?.find(post => post.postId === action.payload.postId);
            post!.comments = post!.comments.map(com => com.id === action.payload.id ? { ...action.payload, answers: [] } : com);
        },
        removeCommentRedux: (state, action: PayloadAction<RemoveCommentReduxType>) => {
            const post = state.posts?.find(post => post.postId === action.payload.postId);
            post!.comments = post!.comments.filter(com => com.id !== action.payload.commentId);
            post!.commentsCount = --post!.commentsCount
        },
        addCommentAnswerRedux: (state, action: PayloadAction<AddCommentAnswerReduxType>) => {
            const post = state.posts?.find(post => post.postId === action.payload.postId);
            const comment = post?.comments.find(com => com.id === action.payload.answer.commentId);
            comment?.answers.push(action.payload.answer);
            comment!.answersCount = ++comment!.answersCount;
            post!.commentsCount = ++post!.commentsCount
        },
        removeCommentAnswerRedux: (state, action: PayloadAction<RemoveCommentAnswerReduxType>) => {
            const post = state.posts?.find(post => post.postId === action.payload.postId);
            const comment = post?.comments.find(comm => comm.id === action.payload.commentId);
            comment!.answers = comment!.answers.filter(answer => answer.id !== action.payload.answerId);
            post!.commentsCount = --post!.commentsCount
        },
        updateCommentAnserRedux: (state, action: PayloadAction<UpdateCommentAnswerReduxType>) => {
            const post = state.posts?.find(post => post.postId === action.payload.postId);
            const comment = post?.comments.find(comm => comm.id === action.payload.answer.commentId);
            comment!.answers = comment!.answers.map(answer => answer.id === action.payload.answer.id ? action.payload.answer : answer);
        },
        onDownloadAnswersRedux: (state, action: PayloadAction<onDownloadAnswersReduxType>) => {
            const post = state.posts?.find(post => post.postId === action.payload.postId);
            const comment = post?.comments.find(com => com.id === action.payload.answers[0].commentId);
            comment!.answers = action.payload.answers;
        },
        onUploadCommentRedux: (state, action: PayloadAction<CommentDtoPaginationResult>) => {
            const post = state.posts?.find(post => post.postId === action.payload.data[0].postId);

            post!.comments = post!.comments.concat(action.payload.data.map(comDto => {
                let newCom: CommentType = {
                    ...comDto,
                    answers: []
                }
                return newCom
            }))
            post!.currentPage = action.payload.currentPage
            post!.pageSize = action.payload.pageSize
            post!.pagesCount = action.payload.pagesCount
            post!.totalCountItems = action.payload.totalCountItems
        },
        incrementCountViewsRedux: (state, action: PayloadAction<number>) => {
            const post = state.posts?.find(post => post.postId === action.payload);
            post!.countViews = ++post!.countViews
        },
    },
    extraReducers: {
        [getUserData.pending.type]: (state) => {
            state.isLoading = true;
            state.errorMessage = '';
        },
        [getUserData.rejected.type]: (state, action: PayloadAction<AxiosError>) => {
            state.isLoading = false;
            console.log('act', action.payload.response?.data);

            if (typeof action.payload.response?.data === 'string')
                state.errorMessage = action.payload.response?.data;
        },
        [getUserData.fulfilled.type]: (state, action: PayloadAction<UserDataType>) => {
            state.isLoading = false;
            console.log(action.payload, ' <<< userDATA');
            state.userId = action.payload.userId;
            state.firstName = action.payload.firstName;
            state.birthday = String(action.payload.birthday);
            state.gender = action.payload.gender;
            state.email = action.payload.email;

            state.posts = [];
        },
        [getUserPosts.pending.type]: (state) => {
            state.isUploading = true;
            state.errorMessage = '';
        },
        [getUserPosts.rejected.type]: (state, action: PayloadAction<AxiosError>) => {

            if (typeof action.payload.response?.data === 'string')
                state.errorMessage = action.payload.response?.data;
            state.isUploading = false;
        },
        [getUserPosts.fulfilled.type]: (state, action: PayloadAction<PostDtoPaginationResult>) => {
            console.log(action.payload, ' <<< userPosts');

            if (action.payload.currentPage === state.currentPage && state.pageSize) return;

            state.currentPage = action.payload.currentPage;
            state.pageSize = action.payload.pageSize;
            state.pagesCount = action.payload.pagesCount;
            state.totalCountItems = action.payload.totalCountItems;
            state.posts = state.posts?.concat(action.payload.data.map(post => {

                const coms: CommentType[] = post.comments.map(com => {
                    const c: CommentType = {
                        ...com,
                        answers: []
                    }
                    return c;
                })
                return {
                    ...post,
                    currentPage: 0,
                    pagesCount: 0,
                    pageSize: 0,
                    totalCountItems: 0,
                    comments: coms
                }
            }));
            state.isUploading = false;


        }
    }
});

export const {
    cleanUserData,
    setUserId,
    deletePost,
    updatePost,
    addPost,
    changeLikeIntoPostById,
    addCommentRedux,
    updateCommentRedux,
    removeCommentRedux,
    addCommentAnswerRedux,
    removeCommentAnswerRedux,
    updateCommentAnserRedux,
    onDownloadAnswersRedux,
    onUploadCommentRedux,
    incrementCountViewsRedux,
} = userSlice.actions;

export default userSlice.reducer;