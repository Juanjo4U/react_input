var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useState, useRef, forwardRef } from 'react';
import MyInput from "./defaultInput";
import { validateInput } from "../utils/validations";
var InputComponent = function (_a, ref) {
    var _b = _a.component, Component = _b === void 0 ? MyInput : _b, name = _a.name, label = _a.label, placeholder = _a.placeholder, _c = _a.initialValue, initialValue = _c === void 0 ? '' : _c, controledValue = _a.controledValue, _d = _a.onChange, onChange = _d === void 0 ? function () { } : _d, _e = _a.validations, validations = _e === void 0 ? {} : _e, props = __rest(_a, ["component", "name", "label", "placeholder", "initialValue", "controledValue", "onChange", "validations"]);
    var input = ref || useRef();
    var _f = useState(), value = _f[0], setValue = _f[1];
    var _g = useState(), isValid = _g[0], setValid = _g[1];
    var isValidationRequired = !!Object.keys(validations).length;
    var formatValue = function (value) { return name ? ({ name: name, value: value }) : value; };
    var handleChange = function (txt, e) {
        setValue(txt + '');
        if (isValidationRequired) {
            var valid = validateInput(txt, validations);
            setValid(valid);
            if (valid) {
                if (!isNaN(txt) && !!txt)
                    txt = Number(txt);
            }
            else
                txt = undefined;
        }
        onChange(formatValue(txt), e);
    };
    var onChangeValue = function (e) {
        handleChange(e.currentTarget.value);
    };
    useEffect(function () {
        if (validations.isValidating) {
            handleChange(value || initialValue);
        }
    }, [validations.isValidating]);
    useEffect(function () {
        if (controledValue !== undefined)
            handleChange(controledValue);
    }, [controledValue]);
    return (React.createElement(Component, __assign({ ref: input }, props, { label: label, placeholder: placeholder, onChange: onChangeValue, defaultValue: initialValue && initialValue + '', value: value, isValid: isValid })));
};
export var Input = forwardRef(InputComponent);
