import { IsMongoId, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  userId: string;
}
