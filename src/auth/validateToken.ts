import { validateTokenFunction } from "utils/token";

export const validateToken = async (token: string) => {
  const data = await validateTokenFunction(token);
  return !!data;
};

/**
export const statusTokenController = async (req: Request, res: Response) =>{
  const match = await !!validateTokenFunction(req.body.token);
  res.status(200).json(new SucessResponse("Credenciales", {"Validado": match}));
}
**/