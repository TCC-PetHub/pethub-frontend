export const authRoutes = {
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
} as const;

export const authRoute = {
  login: (perfil?: string) =>
    perfil ? `/login?perfil=${perfil}` : authRoutes.login,
  register: (perfil?: string) =>
    perfil ? `/register?perfil=${perfil}` : authRoutes.register,
  forgotPassword: () => authRoutes.forgotPassword,
} as const;
