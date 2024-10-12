import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginAuthDto {
  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  password: string;
}
