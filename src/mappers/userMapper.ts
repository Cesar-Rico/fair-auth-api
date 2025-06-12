import { UserDTO } from "dtos/userDto";
import { UserInput } from "types/user";

export const mapUserDtoToInput = (dto: UserDTO): UserInput => ({
  user: dto.user,
  password: dto.password,
  name: dto.name,
  lastName: dto.lastName,
  email: dto.email,
  token: '',
  ip: '',
  status: 1,
});