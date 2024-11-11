import { Test, TestingModule } from '@nestjs/testing';
import { MessageDeleteOneUseCase } from 'src/app/messages/usecases/message-delete-one.usecase';  
import { IMessageRepository } from 'src/common/interfaces/repositories/message-repository.interface';
import { MessageDocument } from 'src/app/messages/entities/message.entity';
import { UpdateMessageDto } from 'src/app/messages/dto/update-message.dto';

describe('MessageDeleteOneUseCase', () => {
  let useCase: MessageDeleteOneUseCase;
  let messageRepository: IMessageRepository<MessageDocument, any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageDeleteOneUseCase,
        {
          provide: 'IMessageRepository',
          useValue: {
            deleteById: jest.fn(),  
          },
        },
      ],
    }).compile();

    useCase = module.get<MessageDeleteOneUseCase>(MessageDeleteOneUseCase);
    messageRepository = module.get<IMessageRepository<MessageDocument, any>>('IMessageRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call deleteById on the repository with correct data', async () => {
    const messageId = '12345';  
    const userId = '54321';  

    const deleteSpy = jest.spyOn(messageRepository, 'deleteById');

  
    await useCase.execute(messageId, userId);

  
    expect(deleteSpy).toHaveBeenCalledWith(userId, messageId);
    expect(deleteSpy).toHaveBeenCalledTimes(1);  
  });

  it('should throw an error if deleteById fails', async () => {
    const messageId = '12345';
    const userId = '54321';
    const error = new Error('Error deleting message');
    
    
    jest.spyOn(messageRepository, 'deleteById').mockRejectedValue(error);

    await expect(useCase.execute(messageId, userId)).rejects.toThrow(error);
  });
});
