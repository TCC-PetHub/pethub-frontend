export interface SessionUser {
  id: string;
  name: string;
  role: "adopter" | "organization";
}

export interface LoginCredentials {
  email: string;
  password: string;
  profile: SessionUser["role"];
  remember?: boolean;
}
