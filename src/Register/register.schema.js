import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    username: yup.string()
        .min(3, 'היייי')
        .max(16)
        .required(),
    email: yup.string()
        .email(),
    password: yup.string()
        .min(6)
        .max(20)
        .required()
});