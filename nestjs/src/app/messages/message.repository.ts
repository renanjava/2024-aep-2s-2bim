import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './entities/message.entity';
import { Model, Types } from 'mongoose';
import { IMessageRepository } from 'src/common/interfaces/repositories/message-repository.interface';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageRepository
  implements IMessageRepository<MessageDocument, UpdateMessageDto>
{
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  public async create(message: MessageDocument): Promise<MessageDocument> {
    return await this.messageModel.create(message);
  }

  public async findAll(): Promise<MessageDocument[]> {
    return await this.messageModel.find();
  }

  public async findAllByUserId(userId: string): Promise<MessageDocument[]> {
    return await this.messageModel.find({ userId: userId });
  }

  async findById(id: string): Promise<MessageDocument | null> {
    return await this.messageModel.findById(id);
  }
  async updateById(
    userId: string,
    messageId: string,
    updateMessageDto: UpdateMessageDto,
  ): Promise<MessageDocument | undefined> {
    await this.messageModel.updateOne(
      { _id: messageId, userId: userId },
      updateMessageDto,
    );
    return this.findById(messageId);
  }
  async deleteById(id: string): Promise<void> {
    await this.messageModel.deleteOne({ _id: id });
  }
}
