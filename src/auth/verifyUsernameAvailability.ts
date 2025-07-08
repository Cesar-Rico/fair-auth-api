import { UserVerifyDTO } from "dtos/userDto";
import { verifyUsernameAvailabilityService } from "services/userService";

export const verifyUsernameAvailability = async (username: string) => {
  const userFind: UserVerifyDTO | null = await verifyUsernameAvailabilityService({user: username});
  return !!userFind;
}