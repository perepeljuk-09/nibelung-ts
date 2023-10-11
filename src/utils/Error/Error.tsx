import React from 'react';
import './Error.scss';

type ErrorType = {
    children: string | undefined;
    Css?: React.CSSProperties;
}

const Error: React.FC<ErrorType> = ({ children, Css }) => {
    return (
        <p className='error' style={Css}>
            {children}
        </p>
    );
};

export { Error };