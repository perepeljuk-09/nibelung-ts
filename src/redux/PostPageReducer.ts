import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { filesApi, postsApi } from '../api/axiosApi';
import { AxiosError, AxiosResponse, isAxiosError } from 'axios';
import type { AddCommentAnswerReduxType, CommentType, CommentDto, CommentDtoPaginationResult, Post, PostDto, RemoveCommentAnswerReduxType, RemoveCommentReduxType, UpdateCommentAnswerReduxType, onDownloadAnswersReduxType } from '../types/types';

interface IinitialState {
    post: Post | null;
    isLoading: boolean;
    error: string;
}

export const getPostByIdAsync = createAsyncThunk(
    'postPage/getById',
    async (id: string, ThunkAPI) => {
        try {
            const res = await postsApi.getPostById(id);
            return res.data;
        } catch (e) {
            if (isAxiosError(e)) console.log('e >>>', e);
            return ThunkAPI.rejectWithValue(e);
        }
    }
);

type onDeletePostAsyncType = {
    postId: number;
    fileId?: string;
}
export const onDeletePostAsync = createAsyncThunk(
    'postPage/deletePost',
    async (data: onDeletePostAsyncType, ThunkAPI) => {
        try {
            if (data.fileId) {
                const res = await filesApi.deleteFile(data.fileId);
            }
            const response = await postsApi.deletePost(data.postId);
            return response;

        } catch (er) {
            if (isAxiosError(er)) {
                console.log('delete post er', er);
                return ThunkAPI.rejectWithValue(er);
            }
        }
    }
);



const initialState: IinitialState = {
    post: null,
    isLoading: false,
    error: '',
};

const postPageReducer = createSlice({
    name: 'postPage',
    initialState,
    reducers: {
        addCommentRedux: (state, action: PayloadAction<CommentDto>) => {
            state.post!.comments.push({ ...action.payload, answers: [] })
            state.post!.commentsCount = ++state.post!.commentsCount
        },
        updatePost: (state, action: PayloadAction<PostDto>) => {
            const coms: CommentType[] = action.payload.comments.map(com => {
                const c: CommentType = {
                    ...com,
                    answers: []
                }
                return c;
            })
            state.post = { ...action.payload, comments: coms }
        },
        updateCommentRedux: (state, action: PayloadAction<CommentDto>) => {
            state.post!.comments = state.post!.comments.map(com => com.id === action.payload.id ? { ...action.payload, answers: com.answers ? com.answers : [] } : com);
        },
        removeCommentRedux: (state, action: PayloadAction<RemoveCommentReduxType>) => {
            state.post!.comments = state.post!.comments.filter(com => com.id !== action.payload.commentId);
            state.post!.commentsCount = --state.post!.commentsCount
        },
        changeLikeIntoPost: (state) => {
            state.post!.likesCount = !state.post!.isLiked ? ++state.post!.likesCount : --state.post!.likesCount
            state.post!.isLiked = !state.post!.isLiked;
        },
        addCommentAnswerRedux: (state, action: PayloadAction<AddCommentAnswerReduxType>) => {
            const comment = state.post!.comments.find(com => com.id === action.payload.answer.commentId);
            comment?.answers.push(action.payload.answer);
            comment!.answersCount = ++comment!.answersCount;
            state.post!.commentsCount = ++state.post!.commentsCount
        },
        removeCommentAnswerRedux: (state, action: PayloadAction<RemoveCommentAnswerReduxType>) => {
            const comment = state.post?.comments.find(comm => comm.id === action.payload.commentId);
            comment!.answers = comment!.answers.filter(answer => answer.id !== action.payload.answerId);
            comment!.answersCount = --comment!.answersCount
            state.post!.commentsCount = --state.post!.commentsCount
        },
        updateCommentAnserRedux: (state, action: PayloadAction<UpdateCommentAnswerReduxType>) => {
            const comment = state.post?.comments.find(comm => comm.id === action.payload.answer.commentId);
            comment!.answers = comment!.answers.map(answer => answer.id === action.payload.answer.id ? action.payload.answer : answer);
        },
        onDownloadAnswersRedux: (state, action: PayloadAction<onDownloadAnswersReduxType>) => {
            const comment = state.post!.comments.find(com => com.id === action.payload.answers[0].commentId);
            comment!.answers = action.payload.answers;
        },
        onUploadCommentRedux: (state, action: PayloadAction<CommentDtoPaginationResult>) => {

            const coms = action.payload.data.map(com => {
                const c: CommentType = {
                    ...com,
                    answers: []
                }
                return c;
            })
            state.post!.comments = state.post!.comments.concat(coms)
            state.post!.currentPage = action.payload.currentPage
            state.post!.pageSize = action.payload.pageSize
            state.post!.pagesCount = action.payload.pagesCount
            state.post!.totalCountItems = action.payload.totalCountItems
        },
        incrementCountViewsRedux: (state, action: PayloadAction<number>) => {
            state.post!.countViews = ++state.post!.countViews
        },
    },
    extraReducers: {
        [getPostByIdAsync.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getPostByIdAsync.rejected.type]: (state, action: PayloadAction<AxiosError>) => {
            if (typeof action.payload === 'string') state.error = action.payload;
            else state.error = 'Произошла ошибка при получении поста';

            state.isLoading = false;
        },
        [getPostByIdAsync.fulfilled.type]: (state, action: PayloadAction<PostDto>) => {


            const coms = action.payload.comments.map(com => {
                const c: CommentType = {
                    ...com,
                    answers: []
                }
                return c;
            })
            const newpost: Post = {
                ...action.payload,
                comments: coms
            }

            state.post = newpost;
            state.post.currentPage = 0;
            state.post.pagesCount = 0;
            state.post.pageSize = 0;
            state.post.totalCountItems = 0;
            state.isLoading = false;
        },
        [onDeletePostAsync.pending.type]: (state) => {
            state.isLoading = true;
        },
        [onDeletePostAsync.rejected.type]: (state, action: PayloadAction<AxiosError>) => {
            if (typeof action.payload === 'string') state.error = action.payload;
            else state.error = 'Произошла ошибка при получении поста';

            state.isLoading = false;
        },
        [onDeletePostAsync.fulfilled.type]: (state, action: PayloadAction<AxiosResponse<string, any>>) => {

            if (action.payload.status !== 200) {
                console.log('response not 200', action.payload);
                return;
            }

            state.post = null;
            state.isLoading = false;
        },
    }
});


export const {
    updatePost,
    addCommentRedux,
    updateCommentRedux,
    removeCommentRedux,
    addCommentAnswerRedux,
    removeCommentAnswerRedux,
    updateCommentAnserRedux,
    changeLikeIntoPost,
    onDownloadAnswersRedux,
    onUploadCommentRedux,
    incrementCountViewsRedux,
} = postPageReducer.actions;

export default postPageReducer.reducer;
