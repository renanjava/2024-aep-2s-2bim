import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './entities/message.entity';
import { MessageRepository } from './message.repository';
import { MessageCreateUseCase } from './usecases/message-create.usecase';
import { MessageFindAllUseCase } from './usecases/message-find-all.usecase';
import { MessageFindOneUseCase } from './usecases/message-find-one.usecase';
import { MessageDeleteOneUseCase } from './usecases/message-delete-one.usecase';
import { MessageUpdateOneUseCase } from './usecases/message-update-one.usecase';
import { MessageFindByLoggedUseCase } from './usecases/message-find-by-logged.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  controllers: [MessageController],
  providers: [
    MessageCreateUseCase,
    MessageFindAllUseCase,
    MessageFindOneUseCase,
    MessageDeleteOneUseCase,
    MessageUpdateOneUseCase,
    MessageFindByLoggedUseCase,
    MessageRepository,
    {
      provide: 'IMessageRepository',
      useExisting: MessageRepository,
    },
  ],
})
export class MessageModule {}
