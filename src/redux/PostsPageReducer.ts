import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { filesApi, postsApi } from '../api/axiosApi';
import { AxiosError, AxiosResponse, isAxiosError } from 'axios';
import { AddCommentAnswerReduxType, CommentDto, CommentDtoPaginationResult, CommentType, PaginationResult, Post, PostDto, RemoveCommentAnswerReduxType, RemoveCommentReduxType, UpdateCommentAnswerReduxType, onDownloadAnswersReduxType } from '../types/types';

interface IinitialState extends Omit<PaginationResult<Post[]>, 'data'> {
    posts: Post[];
    isLoading: boolean;
    error: string;
    isUploading: boolean;
}

export const getPosts = createAsyncThunk(
    'postsPage/getposts',
    async (page: number, ThunkAPI) => {
        try {
            const res = await postsApi.getPosts(page);
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
    'postsPage/deletePost',
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
    posts: [],
    isLoading: false,
    error: '',
    currentPage: 0,
    pagesCount: 0,
    pageSize: 0,
    totalCountItems: 0,
    isUploading: false,
};

const postsPageReducer = createSlice({
    name: 'postsPage',
    initialState,
    reducers: {
        cleanPostsData: (state) => {
            state.posts = [];
            state.isLoading = false;
            state.error = '';
            state.currentPage = 0;
            state.pagesCount = 0;
            state.pageSize = 0;
            state.totalCountItems = 0;
            state.isUploading = false;
        },
        addCommentRedux: (state, action: PayloadAction<CommentDto>) => {
            const post = state.posts?.find(post => post.postId === action.payload.postId);
            post!.comments.push({ ...action.payload, answers: [] })
            post!.commentsCount = ++post!.commentsCount
        },
        updatePost: (state, action: PayloadAction<PostDto>) => {
            state.posts = state.posts?.map(post => post.postId === action.payload.postId ? { ...action.payload, comments: post.comments } : post)
        },
        updateCommentRedux: (state, action: PayloadAction<CommentDto>) => {
            const post = state.posts?.find(post => post.postId === action.payload.postId);
            post!.comments = post!.comments.map(com => com.id === action.payload.id ? { ...action.payload, answers: com.answers ? com.answers : [] } : com);
        },
        removeCommentRedux: (state, action: PayloadAction<RemoveCommentReduxType>) => {
            const post = state.posts?.find(post => post.postId === action.payload.postId);
            post!.comments = post!.comments.filter(com => com.id !== action.payload.commentId);
            post!.commentsCount = --post!.commentsCount
        },
        changeLikeIntoPost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts?.map(post => post.postId === action.payload ? { ...post, isLiked: !post.isLiked, likesCount: !post.isLiked ? ++post.likesCount : --post.likesCount } : post);
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
        [getPosts.pending.type]: (state) => {
            state.error = '';

            if (state.currentPage === 0)
                state.isLoading = true;
            else
                state.isUploading = true;
        },
        [getPosts.rejected.type]: (state, action: PayloadAction<AxiosError>) => {
            if (typeof action.payload === 'string') state.error = action.payload;
            else state.error = 'Произошла ошибка при получении поста';

            if (state.currentPage === 0)
                state.isLoading = false;
            else
                state.isUploading = false;
        },
        [getPosts.fulfilled.type]: (state, action: PayloadAction<PaginationResult<PostDto[]>>) => {
            state.posts = state.posts.concat(action.payload.data.map(post => {

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
            state.currentPage = action.payload.currentPage;
            state.pagesCount = action.payload.pagesCount;
            state.pageSize = action.payload.pageSize;
            state.totalCountItems = action.payload.totalCountItems;



            if (action.payload.currentPage === 1)
                state.isLoading = false;
            else
                state.isUploading = false;

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

            state.posts = [];
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
    cleanPostsData,
} = postsPageReducer.actions;

export default postsPageReducer.reducer;
