import { Inject, Injectable } from '@nestjs/common';
import { IMessageRepository } from 'src/common/interfaces/repositories/message-repository.interface';
import { MessageDocument } from '../entities/message.entity';
import { UpdateMessageDto } from '../dto/update-message.dto';

Injectable();
export class MessageUpdateOneUseCase {
  constructor(
    @Inject('IMessageRepository')
    private iMessageRepository: IMessageRepository<
      MessageDocument,
      UpdateMessageDto
    >,
  ) {}
  async execute(
    userId: string,
    messageId: string,
    updateMessageDto: UpdateMessageDto,
  ) {
    return await this.iMessageRepository.updateById(
      userId,
      messageId,
      updateMessageDto,
    );
  }
}
