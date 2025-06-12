import { Session } from "@/lib/db/types";
import { SessionDto } from "@/lib/data/dto/sessions";

export const mapSessionToDto = (session: Session): SessionDto => ({
  id: session.id,
  userId: session.user_id,
  token: session.session_token,
  expiresAt: session.expires_at,
  createdAt: session.created_at,
});
