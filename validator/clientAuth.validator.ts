// lib/validators/auth.ts
import Joi from "joi";

// ✅ Signup Validator
export const signupSchema = Joi.object({
  firstName: Joi.string().trim().min(2).required().messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 2 characters long",
  }),
  lastName: Joi.string().trim().min(2).required().messages({
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 2 characters long",
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Email is required",
  }),
  password: Joi.string()
    .min(6)
    .pattern(/[A-Z]/, "uppercase")
    .pattern(/[a-z]/, "lowercase")
    .pattern(/[0-9]/, "number")
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters long",
      "string.pattern.name": "Password must contain {#name} letters",
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
      "string.empty": "Confirm password is required",
    }),
  agreeToTerms: Joi.boolean().valid(true).required().messages({
    "any.only": "You must agree to the Terms and Privacy Policy",
  }),
  role: Joi.string().default("client"), // Default to "client" (or patient)
});

// ✅ Login Validator
export const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});
