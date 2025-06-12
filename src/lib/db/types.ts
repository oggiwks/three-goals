import { Generated, Selectable } from "kysely";

export type Database = {
  "goals.goals": GoalTable;
  "goals.goal_sets": GoalSetTable;
  "goals.password_reset": PasswordResetTable;
  "goals.users": UserTable;
  "goals.sessions": SessionTable;
};

export type GoalTable = {
  id: Generated<string>;
  title: string;
  description: string;
  achieved: Date | null;
  due: Date | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  // many-to-one relationship with goal_set
  goal_set_id: string;
};

export type Goal = Selectable<GoalTable>;

export type GoalSetTable = {
  id: Generated<string>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  // many-to-one relationship with user
  user_id: string;
  finalized: Date | null;
};

export type GoalSet = Selectable<GoalSetTable>;

export type UserTable = {
  id: Generated<string>;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

export type User = Selectable<UserTable>;

export type SessionTable = {
  id: Generated<string>;
  // one-to-one relationship with user
  user_id: string;
  session_token: string;
  expires_at: Date;
  created_at: Date;
};

export type Session = Selectable<SessionTable>;

export type PasswordResetTable = {
  id: Generated<string>;
  user_id: string;
  token: string;
  expires_at: Date;
};

export type PasswordReset = Selectable<PasswordResetTable>;

// Combined types
export type GoalSetWithGoals = GoalSet & {
  goals: Goal[];
};
