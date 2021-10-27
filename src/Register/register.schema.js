import * as yup from 'yup';
import { isAvailable } from "../services/userService";

export const registerSchema = yup.object().shape({
    username: yup.string()
        .min(3)
        .max(16)
        .matches(/^[aA-zZ\s_]+\.?[aA-zZ\s_]+$/, 'must only contain letters, numbers, underscores and can not begin or end with a period')
        .test('availability', 'this username is not available, please choose another one!', async (value) => await isAvailable(value))
        .required(),
    email: yup.string()
        .email(),
    password: yup.string()
        .min(6)
        .max(20)
        .required()
});