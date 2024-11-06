import { Inject, Injectable } from '@nestjs/common';
import { IMessageRepository } from 'src/common/interfaces/repositories/message-repository.interface';
import { MessageDocument } from '../entities/message.entity';
import { UpdateMessageDto } from '../dto/update-message.dto';

Injectable();
export class MessageDeleteOneUseCase {
  constructor(
    @Inject('IMessageRepository')
    private iMessageRepository: IMessageRepository<
      MessageDocument,
      UpdateMessageDto
    >,
  ) {}
  async execute(messageId: string, userId: string) {
    await this.iMessageRepository.deleteById(userId, messageId);
  }
}
