import { UserDto } from "@/lib/data/dto/users";
import { z } from "zod";

export const SessionDtoSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  token: z.string(),
  expiresAt: z.date(),
  createdAt: z.date(),
});

export type SessionDto = z.infer<typeof SessionDtoSchema>;

export type UserSession = {
  user: UserDto | null;
  session: SessionDto | null;
};
