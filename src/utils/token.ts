import { getTokenStrategy } from "config/initFairAuthLib";


export const validateTokenFunction = async (token: string): Promise<any> => {
  if (!token) return false;
  try {
    return await getTokenStrategy().validateToken(token);
  } catch (e) {
    console.error("Error interno:", e);
    return null;
  }
};