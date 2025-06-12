import { User } from "@/lib/db/types";
import { UserDto } from "@/lib/data/dto/users";

export const mapUserToDto = (user: Omit<User, "password">): UserDto => ({
  id: user.id,
  email: user.email,
  firstName: user.first_name,
  lastName: user.last_name,
  createdAt: user.created_at,
});
