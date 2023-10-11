

export interface IFormLogin {
    login: string;
    password: string;
}
export interface IFormRegistration {
    firstName: string;
    birthday: Date;
    email: string;
    gender: number;
    password: string;
    passwordConfirm: string;
}

export type IFormRegistrationDto = {
    birthday: string;
} & Omit<IFormRegistration, 'birthday' | 'passwordConfirm'>


export type getUserPostsType = {
    userId: number;
    page: number;
}
export interface IUserDataInitialState extends Omit<PaginationResult<Post>, 'data'> {
    isLoading?: boolean;
    errorMessage?: string;

    isUploading: boolean;

    userId: number | null;
    firstName: string | null;
    birthday: string | null;
    email: string | null;
    gender: number | null;
    posts: Post[];
    addedAt: Date | null;
    updatedAt: Date | null;

    imageSrc?: string | null;
}


export type responseTokensType = {
    accessToken: string;
    refreshToken: string;
}
export type registerType = {
    statusCode: number;
    statusName: string;
    message: string;
}

export type PaginationResult<T> = {
    currentPage: number;
    pageSize: number;
    pagesCount: number;
    totalCountItems: number;
    data: T;
}

export type PostDtoPaginationResult = PaginationResult<PostDto[]>
export type CommentDtoPaginationResult = PaginationResult<CommentDto[]>



export type PostDto = {
    postId: number;
    countViews: number;
    title: string;
    description: string;
    fileId: string;
    isLiked: boolean;
    likesCount: number;
    commentsCount: number;
    authorFirstName: string;
    authorId: number;
    comments: CommentDto[];
    addedAt: Date;
    updatedAt: Date;
} & Omit<PaginationResult<CommentDto>, "data">


export type Post = {
    comments: CommentType[]
} & Omit<PostDto, "comments">

export type UserDataType = {
    userId: number;
    firstName: string;
    birthday: Date;
    gender: number;
    email: string;
    posts: PostDto[];
    addedAt: Date;
    updatedAt: Date;
}

export type UserUpdateData = {
    firstName: string;
    birthday: string;
    gender: number;
    email: string;
}

export type PostCreationDtoType = {
    title: string;
    description: string;
    userId: number;
    fileId?: string;
}
export type PostUpdateDtoType = {
    title: string;
    description: string;
    fileId?: string;
}

export type PostLikeDto = {
    postId: number;
}

export type CommentCreationDto = {
    postId: number;
    content: string;
}
export type CommentUpdateDto = {
    content: string;
}

export type CommentDto = {
    id: number;
    userId: number;
    userFirstName: string;
    postId: number;
    content: string;
    answersCount: number;
    addedAt: string;
    updatedAt: string;
}

export type CommentType = {
    answers: CommentAnswerDto[];
} & CommentDto;

export type RemoveCommentReduxType = {
    postId: number;
    commentId: number;
}
export type AddCommentAnswerReduxType = {
    postId: number;
    answer: CommentAnswerDto;
}

export type RemoveCommentAnswerReduxType = {
    postId: number;
    commentId: number;
    answerId: number;
}

export type UpdateCommentAnswerReduxType = {
    postId: number;
    answer: CommentAnswerDto;
}
export type onDownloadAnswersReduxType = {
    postId: number;
    answers: CommentAnswerDto[];
}

export type CommentAnswerCreationDto = {
    commentId: number;
    content: string;
}
export type CommentAnswerDto = {
    id: number;
    commentId: number;
    userId: number;
    userFirstName: string;
    content: string;
    addedAt: string;
    updatedAt: string;
}

export type CommentAnswerUpdateDto = {
    content: string;
}