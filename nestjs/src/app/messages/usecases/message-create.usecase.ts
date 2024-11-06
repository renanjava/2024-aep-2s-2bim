import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IMessageRepository } from 'src/common/interfaces/repositories/message-repository.interface';
import { MessageDocument } from '../entities/message.entity';
import { UpdateMessageDto } from '../dto/update-message.dto';
import { CreateMessageDto } from '../dto/create-message.dto';

@Injectable()
export class MessageCreateUseCase {
  constructor(
    @Inject('IMessageRepository')
    private iMessageRepository: IMessageRepository<
      MessageDocument,
      UpdateMessageDto
    >,
  ) {}
  async execute(createMessageDto: CreateMessageDto, userId: string) {
    await this.iMessageRepository.create({
      ...createMessageDto,
      userId: userId,
    } as MessageDocument);
  }
}
