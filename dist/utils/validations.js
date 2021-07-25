var isEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//// Validation Functions
var validateNotEmpty = function (value) { return !!value; };
var validateMinValue = function (value, minValue) { return !validateNotEmpty(value) || (value >= minValue); };
var validateMaxValue = function (value, maxValue) { return !validateNotEmpty(value) || (value <= maxValue); };
var validateMinLength = function (value, minLength) { return !validateNotEmpty(value) || (value.length >= minLength); };
var validateMaxLength = function (value, maxLength) { return !validateNotEmpty(value) || (value.length <= maxLength); };
var validateNumber = function (value) { return !isNaN(value) && !(value % 1); };
var validateFloat = function (value) { return !isNaN(value) && !!(value % 1); };
var validateEmail = function (value) { return isEmail.test(String(value).toLowerCase()); };
var validatePassword = function (value) { return (!validateNotEmpty(value) || (validateMinLength(value, 8))); };
var validateCompare = function (value1, value2) { return value1 === value2; };
// Type Validation
export var validationType = {
    email: 'email',
    password: 'password',
    number: 'number',
    float: 'float',
};
var validateType = function (value, type) {
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
};
// requirements Validation
export var validateInput = function (value, obj) {
    if (obj === void 0) { obj = {}; }
    var status = true;
    Object.keys(obj).map(function (key) {
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
                if (typeof obj[key] !== 'function')
                    throw new Error("myValidation must be type: FUNCTION");
                var result = obj[key](value, obj);
                if (typeof result !== 'boolean')
                    throw new Error("myValidation FUNCTION must return boolean");
                status &= result;
            }
        }
    });
    return status;
};
