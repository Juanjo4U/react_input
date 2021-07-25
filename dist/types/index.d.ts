import { ComponentType, Ref, InputHTMLAttributes } from "react";
declare type AnyFunction = (...args: Array<any>) => any;
declare type ValidationFunction = (...args: Array<any>) => boolean;
declare type inputValidationTypes = 'email' | 'password' | 'number' | 'float';
export interface ValidationTypes {
    required?: boolean;
    minValue?: number;
    maxValue?: number;
    minLength?: number;
    maxLength?: number;
    type?: inputValidationTypes;
    compare?: any;
    myValidation?: ValidationFunction;
    isValidating?: boolean;
}
export interface InputPropsTypes {
    component?: ComponentType<any>;
    name?: string;
    label?: string;
    placeholder?: string;
    initialValue?: any;
    controledValue?: any;
    onChange?: AnyFunction;
    validations?: ValidationTypes;
    [x: string]: any;
}
export declare type ComponentWithForwardRefType = ComponentType<InputHTMLAttributes<HTMLInputElement> & InputPropsTypes>;
export declare type InputRefType = Ref<HTMLInputElement>;
export {};
