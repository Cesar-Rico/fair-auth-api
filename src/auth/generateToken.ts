import { getTokenStrategy } from "config/initFairAuthLib";


export const generateToken = async (payload: Record<string, any>)=> {
  const token = await getTokenStrategy().generateToken(payload);
  return token;
}