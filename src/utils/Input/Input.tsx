import React from "react";
import "./Input.scss";

type InputProps = {
    title: string;
    placeholder: string;
    id: string;
}

const Input: React.FC<InputProps> = ({title, placeholder, id, ...props}) => {
    console.log(props)
    return (
        <div className="block__input">
            <label htmlFor={id} className={"input__title"}>{title}
                <input {...props} id={id} placeholder={placeholder} className="custom__input"/>
            </label>
        </div>
    );
};

export {Input};