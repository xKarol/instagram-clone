import * as yup from "yup";
import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MAX_FULL_NAME_LENGTH,
} from "../constants/validation";

const email = { email: yup.string().email().required() };

// const emailOrUsername = {};

const password = {
  password: yup
    .string()
    .min(MIN_PASSWORD_LENGTH)
    .max(MAX_PASSWORD_LENGTH)
    .required(),
};
const username = { username: yup.string().required() };
const fullName = {
  fullName: yup.string().max(MAX_FULL_NAME_LENGTH).required(),
};

export const signInSchema = yup.object().shape({
  ...email, //username or email
  ...password,
});

export const signUpSchema = yup.object().shape({
  ...email,
  ...fullName,
  ...username,
  ...password,
});
