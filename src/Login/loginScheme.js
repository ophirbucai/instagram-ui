import * as yup from 'yup';

export const loginScheme = yup.object().shape({
    username: yup.string()
        .min(3)
        .max(16)
        .required(),
    password: yup.string()
        .min(6)
        .max(20)
        .required()
});