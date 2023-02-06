import React, { ReactNode } from 'react';
import './Form.scss';

type FormProps = {
    children: ReactNode;
    title: string;
}

const Form: React.FC<FormProps> = ({children, title}) => {
    return (
        <div className="backGround">
            <div className="Form">
                <h1 className="Form__title">{title}</h1>
                {children}
            </div>
        </div>
    );
};

export {Form};