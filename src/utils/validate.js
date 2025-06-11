/**
 * Validates the provided email and password based on predefined regex patterns.
 *
 * - Email validation checks for a standard email format.
 * - Password validation checks for:
 *   - At least one digit.
 *   - At least one lowercase letter.
 *   - At least one uppercase letter.
 *   - At least 8 characters in total.
 *
 * @param {string} email - The email address to validate.
 * @param {string} password - The password to validate.
 * @returns {string|null} An error message string if email or password validation fails, otherwise null.
 *                        Returns "Email ID is not valid" for invalid email.
 *                        Returns "Password ID is not valid" for invalid password (if email was valid).
 */
export const checkValidData = (email, password) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordvalid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordvalid) return "Password ID is not valid";

  return null;
};
