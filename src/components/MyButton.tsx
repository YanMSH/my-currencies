import React, {FC} from 'react';
import {Button} from "@mui/material";

interface MyButtonProps {
    title: string;
    clickHandler?: () => void;
}

const MyButton:FC<MyButtonProps> = ({clickHandler, title}, type) => {
    return (
        <Button
            sx={{m: 3, width: '15%'}}
            variant="contained"
            onClick={clickHandler ? () => clickHandler() : undefined}
            type='submit'
        >{title}</Button>
    );
};

export default MyButton;