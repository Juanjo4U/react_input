import React, { forwardRef } from 'react';
import { color } from '../colors';
import { constants } from '../utils/constants';

const Input = ({
    isValid, placeholder, label, style = {},
    ...props
}, ref) =>
    <input ref={ref} {...props}
        style={{
            color: color.text.primary,
            borderWidth: constants.border.width,
            borderRadius: constants.border.radius,
            borderColor: color.border.primary,
            ...isValid !== undefined &&
            { borderColor: isValid ? color.success : color.error },
            ...style
        }}
        placeholder={placeholder}
    />

export default forwardRef(Input);