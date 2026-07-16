// Reusable validation helpers for forms
export const isBlank = (val) => !val || String(val).trim() === "";

export const isEmail = (val) => {
  if (isBlank(val)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val));
};

// At least 8 chars, at least one letter and one digit
export const isStrongPassword = (val) => {
  if (isBlank(val)) return false;
  return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(String(val));
};

// Letters and spaces only
export const isAlphaOnly = (val) => {
  if (isBlank(val)) return false;
  return /^[A-Za-z\s]+$/.test(String(val));
};

// Digits only
export const isNumericOnly = (val) => {
  if (isBlank(val)) return false;
  return /^\d+$/.test(String(val));
};

export default {
  isBlank,
  isEmail,
  isStrongPassword,
  isAlphaOnly,
  isNumericOnly,
};
