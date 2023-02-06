import React from 'react';
import "./Error.scss";

type ErrorType = {
    children: string | undefined;
}

const Error: React.FC<ErrorType> = ({children}) => {
    return (
        <p className="error">
            {children}
        </p>
    );
};

export {Error};