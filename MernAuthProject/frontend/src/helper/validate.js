import toast from "react-hot-toast";

// validate login username
export async function usernameValidate(values) {
  let error = {};
  error = usernameVerify(error, values);
  return error;
}

/** validate password */
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);

  return errors;
}

/** ! **************************************************************** ! **/

/** validate reset password */
export async function resetPasswordValidation(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_password) {
    errors.exist = toast.error("Password not match...!");
  }

  return errors;
}

/** validate password */
function passwordVerify(errors = {}, values) {
  /* eslint-disable no-useless-escape */
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    errors.password = toast.error("Password Required...!");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Wrong Password...!");
  } else if (values.password.length < 4) {
    errors.password = toast.error(
      "Password must be more than 4 characters long"
    );
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error("Password must have special character");
  }

  return errors;
}

// Validate username
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username is required");
  } else if (values.username.length < 2) {
    error.username = toast.error("Username must be more than 2 characters");
  } else if (values.username.length > 20) {
    error.username = toast.error("Username must be less than 20 characters");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username");
  }

  return error;
}
