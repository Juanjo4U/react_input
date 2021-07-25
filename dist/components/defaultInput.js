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
import React, { forwardRef } from 'react';
import { color } from '../colors';
import { constants } from '../utils/constants';
var Input = function (_a, ref) {
    var isValid = _a.isValid, placeholder = _a.placeholder, label = _a.label, _b = _a.style, style = _b === void 0 ? {} : _b, props = __rest(_a, ["isValid", "placeholder", "label", "style"]);
    return React.createElement("input", __assign({ ref: ref }, props, { style: __assign(__assign({ color: color.text.primary, borderWidth: constants.border.width, borderRadius: constants.border.radius, borderColor: color.border.primary }, isValid !== undefined &&
            { borderColor: isValid ? color.success : color.error }), style), placeholder: placeholder }));
};
export default forwardRef(Input);
