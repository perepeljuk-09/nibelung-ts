
type UserPhotoPropsType = {
    imageSrc: string | null | undefined;
    genderId: number | null | undefined;
}

export const UserPhoto: React.FC<UserPhotoPropsType> = ({ imageSrc, genderId }) => {
    return (
        <>
            {imageSrc
                ? <img src={imageSrc} alt="anything img" />
                : genderId === 1 ? <p>М</p>
                    : <p>Ж</p>}
        </>
    );
};