const yup = require("yup");

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email id is required"),
  password: yup.string().required("Password is required"),
});

const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email id is required"),
  password: yup.string().required("Password is required"),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
});

module.exports = { loginSchema, signUpSchema };
