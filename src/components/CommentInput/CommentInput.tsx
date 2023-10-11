import { CiPaperplane } from 'react-icons/ci';
import s from './CommentInput.module.scss';

type CommentInputProps = {

    setContent: (content: string) => void;
    content: string;
    isDisabledBtn: boolean;
    addComment: () => Promise<void>;
    placeholder: string;
    autoFocus?: boolean;
}

const CommentInput: React.FC<CommentInputProps> = ({ addComment, content, isDisabledBtn, setContent, placeholder, autoFocus = false }) => {
    return (
        <div className={s.comment}>
            <input className={s.comment__input} autoFocus={autoFocus} type="text" placeholder={placeholder} value={content} onChange={(e) => setContent(e.target.value)} />
            <button className={s.comment__btn} onClick={addComment} disabled={isDisabledBtn}>
                <CiPaperplane className={isDisabledBtn ? s.comment__send_disable : s.comment__send} size={25} />
            </button>
        </div>
    );
};

export { CommentInput };