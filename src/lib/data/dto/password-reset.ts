import { z } from "zod";

export const CreatePasswordResetDtoSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type CreatePasswordResetDto = z.infer<
  typeof CreatePasswordResetDtoSchema
>;

export const ResetPasswordDtoSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(16, { message: "Password must be less than 16 characters" }),
    passwordConfirmation: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(16, { message: "Password must be less than 16 characters" }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords must match",
  });

export type ResetPasswordDto = z.infer<typeof ResetPasswordDtoSchema>;
