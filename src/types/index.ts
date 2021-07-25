import { ComponentType, Ref, InputHTMLAttributes } from "react";

type AnyFunction = (...args: Array<any>) => any;
type ValidationFunction = (...args: Array<any>) => boolean;

type inputValidationTypes = 'email' | 'password' | 'number' | 'float';
export interface ValidationTypes {
    required?: boolean,
    minValue?: number,
    maxValue?: number,
    minLength?: number,
    maxLength?: number,
    type?: inputValidationTypes,
    compare?: any,
    myValidation?: ValidationFunction,
    isValidating?: boolean
}
export interface InputPropsTypes {
    component?: ComponentType<any>,
    name?: string,
    label?: string,
    placeholder?: string,
    initialValue?: any,
    controledValue?: any,
    onChangeText?: AnyFunction,
    validations?: ValidationTypes,
    [x: string]: any
}

export type ComponentWithForwardRefType = ComponentType<InputHTMLAttributes<HTMLInputElement> & InputPropsTypes>;

export type InputRefType = Ref<HTMLInputElement>