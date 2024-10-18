import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './entities/message.entity';
import { Model } from 'mongoose';

export class MessageRepository {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  public async create(message: MessageDocument): Promise<MessageDocument> {
    return await this.messageModel.create(message);
  }

  public async findAll(): Promise<MessageDocument[]> {
    return await this.messageModel.find();
  }
}
