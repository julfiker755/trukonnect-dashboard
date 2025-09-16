import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

// reviewerSchema
export const reviewerSchema = z.object({
  name: z.string().nonempty("Name is required"),
  phone: z
    .string()
    .nonempty("Phone is required")
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),

  email: z.string().nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

// platformSchema
export const platformSchema = z.object({
  name: z.string().nonempty("Name is required"),
  icon: z.any().refine((file) => file instanceof File, {
    message: "Icon is required",
  }),
});

// engagementSchema
export const engagementSchema = z.object({
  name: z.string().nonempty("Name is required"),
  minimum: z.string().nonempty("Minimum is required"),
  price: z.string().nonempty("Price is required"),
  description: z.string().nonempty("Description is required"),
});

export const bulkSchema = z.object({
  subject: z.string().nonempty("Subject is required"),
  message: z.string().nonempty("Message is required"),
});

export const passwordChangeSchema = z
  .object({
    current_password: z.string().nonempty("Current Password is required"),
    new_password: z.string().nonempty("New Password is required"),
    c_password: z.string().nonempty("Confirm password is required"),
  })
  .refine((value) => value.new_password === value.c_password, {
    path: ["c_password"],
    message: "Passwords must be match.",
  });


export const adminSchema = z
  .object({
   name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required"),
    password: z.string().nonempty("Password is required"),
  })







// loginSchema
// export const ForgotSchema = z.object({
//   email: z
//     .string()
//     .nonempty("Email is required")
//     .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
//       message: "Invalid email address",
//     }),
// });

// // /passwordSchema
// export const passwordChangeSchema = z
//   .object({
//     current_password: z.string().nonempty("Current Password is required"),
//     new_password: z.string().nonempty("New Password is required"),
//     c_password: z.string().nonempty("Confirm password is required"),
//   })
//   .refine((value) => value.new_password === value.c_password, {
//     path: ["c_password"],
//     message: "Passwords must be match.",
//   });

// // forgot password
// export const passwordSchema11 = z
//   .object({
//     password: z.string().nonempty("Password is required"),
//     c_password: z.string().nonempty("Confirm Password is required"),
//   })
//   .refine((value) => value.password === value.c_password, {
//     path: ["c_password"],
//     message: "Passwords must be match.",
//   });
