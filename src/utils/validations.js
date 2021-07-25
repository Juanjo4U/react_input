const isEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


//// Validation Functions
const validateNotEmpty = value => !!value;

const validateMinValue = (value, minValue) => !validateNotEmpty(value) || (value >= minValue);

const validateMaxValue = (value, maxValue) => !validateNotEmpty(value) || (value <= maxValue);

const validateMinLength = (value, minLength) => !validateNotEmpty(value) || (value.length >= minLength);

const validateMaxLength = (value, maxLength) => !validateNotEmpty(value) || (value.length <= maxLength);

const validateNumber = value => !isNaN(value) && !(value % 1);

const validateFloat = value => !isNaN(value) && !!(value % 1);

const validateEmail = value => isEmail.test(String(value).toLowerCase());

const validatePassword = value => (!validateNotEmpty(value) || (validateMinLength(value, 8)));

const validateCompare = (value1, value2) => value1 === value2;

// Type Validation

export const validationType = {
    email: 'email',
    password: 'password',
    number: 'number',
    float: 'float',
}

const validateType = (value, type) => {
    if (!validateNotEmpty(value))
        return false;
    switch (type) {
        case validationType.email:
            return validateEmail(value);
        case validationType.number:
            return validateNumber(value);
        case validationType.float:
            return validateFloat(value);
        case validationType.password:
            return validatePassword(value);
    }
}

// requirements Validation

export const validateInput = (value, obj = {}) => {
    let status = true;
    Object.keys(obj).map(key => {
        switch (key) {
            case 'required':
                status &= validateNotEmpty(value) || !obj[key];
                break;
            case 'minValue':
                status &= validateMinValue(value, obj[key]);
                break;
            case 'maxValue':
                status &= validateMaxValue(value, obj[key]);
                break;
            case 'minLength':
                status &= validateMinLength(value, obj[key]);
                break;
            case 'maxLength':
                status &= validateMaxLength(value, obj[key]);
                break;
            case 'type':
                status &= validateType(value, obj[key]);
                break;
            case 'compare':
                status &= validateCompare(value, obj[key]);
                break;
            case 'myValidation': {
                if (typeof obj[key] !== 'function') throw new Error(`myValidation must be type: FUNCTION`);
                const result = obj[key](value, obj);
                if (typeof result !== 'boolean') throw new Error(`myValidation FUNCTION must return boolean`);
                status &= result;
            }
        }
    });
    return status;
}