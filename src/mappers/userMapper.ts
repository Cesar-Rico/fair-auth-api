import { UserDTO, UserResponseDTO } from "dtos/userDto";
import { User } from "models/user";
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

export const mapUserToUserResponseDto = (dto: User): UserResponseDTO => ({
  user: dto.user,
  name: dto.name,
  lastName: dto.lastName,
  email: dto.email,
  status: dto.status,
});