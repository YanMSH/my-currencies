import React, {FC, FormEvent} from 'react';
import StringInput from "./StringInput";
import MyButton from "./MyButton";

interface CurrencyGroupProps {
    currentInput: string;
    setCurrentInput: (str: string) => void;
    parseHandler: () => void;
}

const CurrencyGroup: FC<CurrencyGroupProps> = ({currentInput, setCurrentInput, parseHandler}) => {

    return (
        <div>
            <form onSubmit={(e: FormEvent) => {
                e.preventDefault();
                parseHandler()
            }}>
            <StringInput changeHandler={setCurrentInput} inputValue={currentInput} placeholder='Your string'/>
            <MyButton title={'Convert'} />
            </form>
        </div>
    );
};

export default CurrencyGroup;