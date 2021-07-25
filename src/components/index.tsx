import React, { useEffect, useState, useRef, forwardRef } from 'react';
import MyInput from "./defaultInput";
import { ComponentWithForwardRefType, InputPropsTypes, InputRefType } from '../types';
import { validateInput } from "../utils/validations";

const InputComponent = ({
    component: Component = MyInput,
    name, label, placeholder, initialValue = '', controledValue,
    onChange = () => { },
    validations = {},
    ...props
}: InputPropsTypes, ref: InputRefType) => {

    const input = ref || useRef();
    const [value, setValue] = useState<any>();
    const [isValid, setValid] = useState<boolean>();
    const isValidationRequired = !!Object.keys(validations).length;

    const formatValue = (value: any): any => name ? ({ name, value }) : value;

    const handleChange = (txt: any, e?: any): any => {
        setValue(txt + '');
        if (isValidationRequired) {
            let valid = validateInput(txt, validations);
            setValid(valid);
            if (valid) {
                if (!isNaN(txt) && !!txt) txt = Number(txt);
            } else txt = undefined;
        }
        onChange(formatValue(txt), e);
    }

    const onChangeValue = (e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
    >): any => {
        handleChange(e.currentTarget.value);
    }

    useEffect(() => {
        if (validations.isValidating) {
            handleChange(value || initialValue);
        }
    }, [validations.isValidating])

    useEffect(() => {
        if (controledValue !== undefined) handleChange(controledValue);
    }, [controledValue])

    return (
        <Component ref={input} {...props}
            label={label}
            placeholder={placeholder}
            onChange={onChangeValue}
            defaultValue={initialValue && initialValue + ''}
            value={value}
            isValid={isValid}
        />
    )
}

export const Input: ComponentWithForwardRefType = forwardRef(InputComponent);