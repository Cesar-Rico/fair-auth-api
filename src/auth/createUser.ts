import { UserDTO} from 'dtos/userDto';
import { mapUserDtoToInput } from 'mappers/userMapper';
import { registerUser } from 'services/userService';
import { validarDatosUsuario } from 'utils/validations';

export const createUser = async (dto: UserDTO) => {
    validarDatosUsuario(dto);
    const userInput = mapUserDtoToInput(dto);
    return await registerUser(userInput);
};