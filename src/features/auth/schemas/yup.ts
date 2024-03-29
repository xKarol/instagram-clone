import * as yup from "yup";
import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MAX_FULL_NAME_LENGTH,
  MIN_USERNAME_LENGTH,
} from "../constants";

const email = yup.string().email().required();

const login = yup.string().required();

const password = yup
  .string()
  .min(MIN_PASSWORD_LENGTH)
  .max(MAX_PASSWORD_LENGTH)
  .required();

const username = yup.string().min(MIN_USERNAME_LENGTH).required();
const fullName = yup.string().max(MAX_FULL_NAME_LENGTH).required();

export const signInSchema = yup.object().shape({
  login, //username or email
  password,
});

export const signUpSchema = yup.object().shape({
  email,
  fullName,
  username,
  password,
});
