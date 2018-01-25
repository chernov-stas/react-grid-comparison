import React from 'react';
import {Field, reduxForm} from 'redux-form';

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Required';
    } else if (values.name.length > 15) {
        errors.username = 'Must be 15 characters or less';
    }
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

const warn = values => {
    const warnings = {};
    if (values.name.length < 3) {
        warnings.name = "Hmm, seems it's too little letters in your name...";
    }
    return warnings;
};

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} type={type} />
            <div>
                {touched &&
                    ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    </div>
);

const normalizePhone = (value, previousValue) => {
    if (!value) {
        return value;
    }
    const onlyNums = value.replace(/[^\d]/g, '');
    if (!previousValue || value.length > previousValue.length) {
        // typing forward
        if (onlyNums.length === 1) {
            return '+' + onlyNums;
        }
        if (onlyNums.length === 3) {
            return onlyNums + '-';
        }
        if (onlyNums.length === 6) {
            return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3) + '-';
        }
    }
    if (onlyNums.length <= 3) {
        return onlyNums;
    }
    if (onlyNums.length <= 6) {
        return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3);
    }
    return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3, 6) + '-' + onlyNums.slice(6, 10);
};

const SampleForm = ({handleSubmit}) => (
    <form onSubmit={handleSubmit}>
        <Field name="name" type="text" component={renderField} label="Name:" />
        <Field name="email" type="text" component={renderField} label="Email:" />
        <Field name="phone" type="text" normalize={normalizePhone} component={renderField} label="Phone:" />
        <button type="submit">Submit</button>
    </form>
);

export default reduxForm({
    form: 'addUser',
    validate,
    warn,
})(SampleForm);
