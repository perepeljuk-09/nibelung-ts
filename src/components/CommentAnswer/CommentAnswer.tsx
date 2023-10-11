import { CiCircleRemove, CiEdit } from 'react-icons/ci';
import { useState } from 'react';
import type { CommentAnswerDto, RemoveCommentAnswerReduxType, UpdateCommentAnswerReduxType } from '../../types/types';
import { isAxiosError } from 'axios';
import { commentsApi } from '../../api/axiosApi';
import { useAppDispatch } from '../../hooks/hooks';
import { Link } from 'react-router-dom';
import s from './CommentAnswer.module.scss';

type CommentAnswerProps = {
    onRemoveCommentAnswerRedux: (data: RemoveCommentAnswerReduxType) => void;
    onUpdateCommentAnswerRedux: (data: UpdateCommentAnswerReduxType) => void;
    postId: number;
} & CommentAnswerDto;

const CommentAnswer: React.FC<CommentAnswerProps> = ({ onRemoveCommentAnswerRedux, onUpdateCommentAnswerRedux, postId, id, commentId, content, userId, userFirstName, updatedAt, addedAt }) => {

    const dispatch = useAppDispatch();
    const localUserId = +localStorage.getItem('user_id')!

    const [disabled, setDisabled] = useState<boolean>(false);

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editText, setEditText] = useState<string>(content);

    const onRemove = async () => {
        setDisabled(true);
        try {
            const response = await commentsApi.deleteCommentAnswer(id);

            if (response.status === 200) {
                console.log('successfully delete answer');
                onRemoveCommentAnswerRedux({ answerId: id, commentId, postId });
            }

        } catch (er) {
            if (isAxiosError(er)) console.log(er);
        } finally {
            setDisabled(false);
        }
    };

    const onUpdate = async () => {
        try {
            const response = await commentsApi.updateCommentAnswer(id, { content: editText });

            if (response.status === 200) {
                console.log('Success update answer');
                onUpdateCommentAnswerRedux({ postId, answer: response.data });
                setIsEdit(false);
            }
        } catch (er) {
            if (isAxiosError(er)) console.log(er);
        }
    };

    const GetDateTime = (date: string) => date.split('T').join(' ').split('.')[0];

    return (
        <div className={s.answer}>
            <div className={s.answer__header}>

                <Link className={s.answer__link} to={`/${userId}`}>
                    <p className={s.answer__firstName}>{userFirstName}</p>
                </Link>
                {localUserId === userId && !isEdit ?
                    <div className={s.answer__btns}>
                        <button className={s.answer__btn} onClick={() => setIsEdit(true)}>
                            <CiEdit className={s.answer__edit} size={20} title='Редактировать комментарий' />
                        </button>
                        <button className={s.answer__btn} disabled={disabled} onClick={onRemove}>
                            <CiCircleRemove className={s.answer__remove} size={20} title='Удалить комментарий' />
                        </button>
                    </div>
                    : null}
            </div>

            {!isEdit ? (
                <p className={s.answer__content}>{content}</p>
            ) : (
                <input className={s.answer__input} autoFocus type='text' value={editText} onChange={(e) => setEditText(e.target.value)} />
            )}
            <div className={s.answer__footer}>
                {!isEdit ? (
                    <p className={s.answer__addedat}>{updatedAt.split('-')[0] !== '0001' ? GetDateTime(updatedAt) : GetDateTime(addedAt)}</p>
                ) : (
                    <div className={s.answer__edit_btns}>
                        <button className={s.answer__cancel} onClick={() => setIsEdit(false)}>Отменить</button>
                        <button className={s.answer__confirm} onClick={onUpdate}>Подтвердить изменение</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export { CommentAnswer };