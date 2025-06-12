import { z } from "zod";

export const UserDtoSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email({ message: "Invalid email address" }),
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(100, { message: "First name must be less than 100 characters" }),
  lastName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(100, { message: "First name must be less than 100 characters" }),
  createdAt: z.date(),
});

export type UserDto = z.infer<typeof UserDtoSchema>;

export const CreateUserDtoSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    firstName: z
      .string()
      .min(1, { message: "First name is required" })
      .max(100, { message: "First name must be less than 100 characters" }),
    lastName: z
      .string()
      .min(1, { message: "Last name is required" })
      .max(100, { message: "Last name must be less than 100 characters" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(16, { message: "Password must be less than 16 characters" }),
    passwordConfirmation: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .max(16, {
        message: "Password must be less than 16 characters",
      }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords must match",
    path: ["passwordConfirmation"],
  });

export type CreateUserDto = z.infer<typeof CreateUserDtoSchema>;

export const UpdateUserPasswordDtoSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(16, { message: "Password must be less than 16 characters" }),
});

export type UpdateUserPasswordDto = z.infer<typeof UpdateUserPasswordDtoSchema>;

export const LoginUserDtoSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(16, { message: "Password must be less than 16 characters" }),
});

export type LoginUserDto = z.infer<typeof LoginUserDtoSchema>;
