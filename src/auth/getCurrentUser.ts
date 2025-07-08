import { getTokenStrategy } from "config/initFairAuthLib";

export const getCurrentUser = async (token: string) => {
  const user = await getTokenStrategy().validateToken(token)
  return user || null;
}