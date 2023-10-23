import type { CommentAnswerCreationDto, CommentAnswerDto, CommentAnswerUpdateDto, CommentCreationDto, CommentDto, CommentDtoPaginationResult, CommentUpdateDto, IFormLogin, IFormRegistrationDto, PaginationResult, PostDto, PostCreationDtoType, PostDtoPaginationResult, PostLikeDto, PostUpdateDtoType, UserDataType, UserUpdateData, registerType, responseTokensType } from './../types/types';
import axios from 'axios';

export const instanceAxios = axios.create({
    baseURL: 'https://localhost:7229/',
});


export const authApi = {
    login: async (data: IFormLogin) => {
        return await instanceAxios.post<responseTokensType>('api/auth/authorize', data);
    },
    async registration(data: IFormRegistrationDto) {
        return await instanceAxios.post<registerType>('api/auth/registration', data);
    },
    logout: async (refreshToken: string) => {
        const data = { refreshToken };
        return await instanceAxios.post<boolean>('api/auth/logout', data);
    },
    refreshTokens: async (refreshToken: string) => {
        const data = { refreshToken };
        return await instanceAxios.post<responseTokensType>('api/auth/tokens', data);
    }
};

export const userApi = {
    getUserDataById: async (id: number) => {
        return await instanceAxios.get<UserDataType>(`api/users/${id}`);
    },
    updateUser: async (id: number, data: UserUpdateData) => {
        return await instanceAxios.put(`api/users/${id}`, data);
    }
};

export const filesApi = {
    uploadFile: async (file: File) => {
        return await instanceAxios.postForm<string>('api/files', { formFile: file });
    },
    deleteFile: async (fileId: string) => {
        return await instanceAxios.delete<string>(`api/files/${fileId}`);
    },
};
export const postsApi = {
    getPosts: async (page: number) => {
        return await instanceAxios.get<PaginationResult<PostDto[]>>(`api/posts?page=${page}`);
    },
    createPost: async (postDto: PostCreationDtoType) => {
        return await instanceAxios.post<PostDto>('api/posts', postDto);
    },
    updatePost: async (id: number, postDto: PostUpdateDtoType) => {
        return await instanceAxios.put<PostDto>(`api/posts/${id}`, postDto);
    },
    getPostById: async (id: string) => {
        return await instanceAxios.get<PaginationResult<PostDto>>(`api/posts/${id}`);
    },
    deletePost: async (id: number) => {
        return await instanceAxios.delete<boolean>(`api/posts/${id}`);
    },
    getUserPostsByPage: async (userid: number, page: number) => {
        return await instanceAxios.get<PostDtoPaginationResult>(`api/posts/user?userId=${userid}&page=${page}`);
    },
    incrementCountViews: async (postId: number) => {
        return await instanceAxios.put<boolean>(`api/posts/count/${postId}`);
    },
};
export const postLikesApi = {
    addLike: async (postLikeDto: PostLikeDto) => {
        return await instanceAxios.post<string>('api/postlikes', postLikeDto);
    },
    deleteLike: async (postId: number) => {
        return await instanceAxios.delete<string>(`api/postlikes/${postId}`);
    }
};

export const commentsApi = {
    addComment: async (commentDto: CommentCreationDto) => {
        return await instanceAxios.post<CommentDto>('api/comments', commentDto);
    },
    removeComment: async (id: number) => {
        return await instanceAxios.delete<boolean>(`api/comments/${id}`);
    },
    updateComment: async (id: number, data: CommentUpdateDto) => {
        return await instanceAxios.put<CommentDto>(`api/comments/${id}`, data);
    },
    addCommentAnswer: async (commentAnswerDto: CommentAnswerCreationDto) => {
        return await instanceAxios.post<CommentAnswerDto>('api/comments/answer', commentAnswerDto);
    },
    deleteCommentAnswer: async (id: number) => {
        return await instanceAxios.delete<boolean>(`api/comments/answer/${id}`);
    },
    updateCommentAnswer: async (id: number, data: CommentAnswerUpdateDto) => {
        return await instanceAxios.put<CommentAnswerDto>(`api/comments/answer/${id}`, data);
    },
    getCommentAnswersByCommentId: async (id: number) => {
        return await instanceAxios.get<CommentAnswerDto[]>(`api/comments/answer/${id}`);
    },
    getCommentsPagination: async (postId: number, page: number, firstCommentDateAddedAt: string) => {
        return await instanceAxios.get<CommentDtoPaginationResult>(`api/comments/pagination?post_id=${postId}&page=${page}&first_comment_date=${firstCommentDateAddedAt}`);
    }
};