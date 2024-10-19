import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageRepository } from './message.repository';
import { MessageDocument } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(private messageRepository: MessageRepository) {}
  async create(createMessageDto: CreateMessageDto, userId: string) {
    await this.messageRepository.create({
      ...createMessageDto,
      userId: userId,
    } as MessageDocument);
  }

  async findAll() {
    return await this.messageRepository.findAll();
  }

  async findById(userId: string, messageId: string) {
    return await this.messageRepository.findById(userId, messageId);
  }

  async findAllByLoggerUser(userId: string) {
    return await this.messageRepository.findAllByUserId(userId);
  }

  async update(
    userId: string,
    messageId: string,
    updateMessageDto: UpdateMessageDto,
  ) {
    return await this.messageRepository.updateById(
      userId,
      messageId,
      updateMessageDto,
    );
  }

  async remove(messageId: string, userId: string) {
    await this.messageRepository.deleteById(userId, messageId);
  }
}
