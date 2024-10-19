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

  async findByLoggerUser(userId: string) {
    return await this.messageRepository.findByUserId(userId);
  }

  findOne(id: string) {
    return `This action returns a #${id} message`;
  }

  update(id: string, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: string) {
    return `This action removes a #${id} message`;
  }
}
