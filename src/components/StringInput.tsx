import React, {FC} from 'react';
import {TextField} from "@mui/material";

interface StringInputProps {
    inputValue: string;
    placeholder: string;
    changeHandler: (str: string) => void;
}

const StringInput: FC<StringInputProps> = ({inputValue, placeholder, changeHandler}) => {
    return (
        <div>
            <TextField
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => changeHandler(e.target.value)}
            />
        </div>
    );
};

export default StringInput;