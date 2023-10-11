import { CiCircleRemove, CiEdit } from 'react-icons/ci';
import type { AddCommentAnswerReduxType, CommentType, CommentDto, RemoveCommentAnswerReduxType, RemoveCommentReduxType, UpdateCommentAnswerReduxType, onDownloadAnswersReduxType } from '../../types/types';
import { isAxiosError } from 'axios';
import { commentsApi } from '../../api/axiosApi';
import { useState } from 'react';
import { CommentInput } from '../CommentInput/CommentInput';
import { CommentAnswer } from '../CommentAnswer/CommentAnswer';
import { Link } from 'react-router-dom';
import s from './Comment.module.scss';

type CommentProps = {
    isLastItem: boolean;
    onRemoveCommentRedux: (data: RemoveCommentReduxType) => void;
    onUpdateCommentRedux: (data: CommentDto) => void;
    onAddCommentAnswer: (data: AddCommentAnswerReduxType) => void;
    onRemoveCommentAnswerRedux: (data: RemoveCommentAnswerReduxType) => void;
    onUpdateCommentAnswerRedux: (data: UpdateCommentAnswerReduxType) => void;
    onDownloadAnswersRedux: (data: onDownloadAnswersReduxType) => void;
} & CommentType;

const Comment: React.FC<CommentProps> = ({
    onRemoveCommentRedux,
    onUpdateCommentRedux,
    onAddCommentAnswer,
    onRemoveCommentAnswerRedux,
    onUpdateCommentAnswerRedux,
    onDownloadAnswersRedux,
    isLastItem,
    id,
    userId,
    userFirstName,
    postId,
    updatedAt,
    content,
    answers,
    answersCount,
    addedAt
}) => {

    const [disabled, setDisabled] = useState<boolean>(false);

    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [answer, setAnswer] = useState<string>('');
    const [disabledAnswer, setDisabledAnswer] = useState<boolean>(false);



    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editText, setEditText] = useState<string>(content);
    const [disabledConfirmBtn, setDisabledConfirmBtn] = useState<boolean>(false);

    const [isDownloadAnswers, setIsDownloadAnswers] = useState<boolean>(false);


    const localUserId = +localStorage.getItem('user_id')!

    const onRemoveComment = async () => {
        setDisabled(true);
        try {
            const response = await commentsApi.removeComment(id);

            if (response.status === 200) {
                console.log('successfully remove comment');
                onRemoveCommentRedux({ postId, commentId: id })
            }
        } catch (er) {
            if (isAxiosError(er)) console.log(er);
        } finally {
            setDisabled(false);
        }
    };

    const addCommentAnswer = async () => {
        setDisabledAnswer(true);
        try {
            const response = await commentsApi.addCommentAnswer({ commentId: id, content: answer });

            if (response.status === 200) {
                console.log('success add answer', response.data);
                onAddCommentAnswer({ answer: response.data, postId })
                setAnswer('');
            }
        } catch (er) {
            if (isAxiosError(er)) console.log(er);
        } finally {
            setDisabledAnswer(false)
        }
    };

    const onUpdateComment = async () => {
        setDisabledConfirmBtn(true);
        try {
            const response = await commentsApi.updateComment(id, { content: editText });

            if (response.status === 200) {
                console.log('success update comment');
                onUpdateCommentRedux(response.data);
                setIsEdit(false);
            }
        } catch (er) {
            if (isAxiosError(er)) console.log(er);
        } finally {
            setDisabledConfirmBtn(false);
        }
    };


    const downloadAnswers = async () => {
        setIsDownloadAnswers(true)
        try {
            const response = await commentsApi.getCommentAnswersByCommentId(id);

            console.log("answers", response)
            onDownloadAnswersRedux({ postId, answers: response.data })
        } catch (err) {
            if (isAxiosError(err)) console.log("err", err)
        } finally {
            setTimeout(() => {
                setIsDownloadAnswers(false);
            }, 1000)
        }
    }

    const GetDateTime = (date: string) => date.split('T').join(' ').split('.')[0];

    return (
        <div className={s.comment}>
            <div className={s.comment__header}>

                <Link className={s.comment__link} to={`/${userId}`}>
                    <p className={s.comment__firstName}>{userFirstName}</p>
                </Link>
                {localUserId === userId && !isEdit ? (
                    <div className={s.comment__btns}>
                        <button className={s.comment__btn_edit} onClick={() => setIsEdit(true)}>
                            <CiEdit className={s.comment__edit} size={20} title='Редактировать комментарий' />
                        </button>
                        <button className={s.comment__btn} disabled={disabled} onClick={onRemoveComment}>
                            <CiCircleRemove className={s.comment__remove} size={20} title='Удалить комментарий' />
                        </button>
                    </div>
                ) : null}
            </div>

            {!isEdit ? (
                <p className={s.comment__content}>{content}</p>
            ) : (
                <input className={s.comment__input} autoFocus type='text' value={editText} onChange={(e) => setEditText(e.target.value)} />
            )}
            <div className={s.comment__footer}>
                {!isEdit ? (
                    <>
                        <p className={s.comment__addedat}>{updatedAt.split('-')[0] !== '0001' ? GetDateTime(updatedAt) : GetDateTime(addedAt)}</p>
                        {!isDownloadAnswers && answers.length === answersCount ? (
                            <span className={s.comment__answer} onClick={() => setShowAnswer(prev => !prev)}>ответить</span>
                        ) : (
                            <button className={s.comment__download_answers} onClick={downloadAnswers}>Ответы {answersCount}</button>
                        )}
                    </>
                ) : (
                    <div className={s.comment__edit_btns}>
                        <button className={s.comment__cancel} onClick={() => setIsEdit(false)}>Отменить</button>
                        <button className={s.comment__confirm} onClick={onUpdateComment} disabled={disabledConfirmBtn}>Подтвердить изменение</button>
                    </div>
                )}
            </div>


            {answers && answers.length && !isDownloadAnswers ? answers.map(answer => <CommentAnswer
                key={answer.id}
                postId={postId}
                {...answer}
                onRemoveCommentAnswerRedux={onRemoveCommentAnswerRedux}
                onUpdateCommentAnswerRedux={onUpdateCommentAnswerRedux}
            />) : answersCount ? (
                <div className={s.comment__download}>
                    {!isDownloadAnswers ? null : (
                        <p>loading........</p>
                    )}
                </div>
            ) : null}

            {showAnswer ? <CommentInput
                addComment={addCommentAnswer}
                content={answer}
                isDisabledBtn={disabledAnswer}
                placeholder='Написать ответ на комментарий...'
                setContent={setAnswer}
                autoFocus
            /> : null}

        </div>
    );
};

export { Comment };