import React, { ComponentProps } from 'react';
import './Button.scss';


type ButtonType = {
    children: string;

} & ComponentProps<'button'>

const Button: React.FC<ButtonType> = (props) => {
    return (
        <button {...props} className='custom__btn'>{props.children}</button>
    );
};

export { Button };