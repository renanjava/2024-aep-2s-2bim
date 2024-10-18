import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

export class Password {
  public static async generateEncrypted(password: string): Promise<string> {
    const configService = new ConfigService();
    const salt = configService.get<string>('SALT_PASSWORD');
    return bcrypt.hash(password, salt);
  }

  public static async verify(
    password: string,
    encrypted: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, encrypted);
  }
}
