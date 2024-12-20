import { Test, TestingModule } from '@nestjs/testing';
import { MessageCreateUseCase } from 'src/app/messages/usecases/message-create.usecase'; 
import { IMessageRepository } from 'src/common/interfaces/repositories/message-repository.interface';
import { CreateMessageDto } from 'src/app/messages/dto/create-message.dto';
import { MessageDocument } from 'src/app/messages/entities/message.entity';


describe('MessageCreateUseCase', () => {
  let useCase: MessageCreateUseCase;
  let messageRepository: IMessageRepository<MessageDocument, any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageCreateUseCase,
        {
          provide: 'IMessageRepository',
          useValue: {
            create: jest.fn(),  
          },
        },
      ],
    }).compile();

    useCase = module.get<MessageCreateUseCase>(MessageCreateUseCase);
    messageRepository = module.get<IMessageRepository<MessageDocument, any>>('IMessageRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call create on the repository with correct data', async () => {
    const createMessageDto: CreateMessageDto = {
      title: 'Test Title',
      description: 'Test Description',
      url: 'https://www.example.com',
    };

    const userId = '12345';  

    
    const createSpy = jest.spyOn(messageRepository, 'create');

   
    await useCase.execute(createMessageDto, userId);

    
    expect(createSpy).toHaveBeenCalledWith({
      ...createMessageDto,
      userId,
    });
    expect(createSpy).toHaveBeenCalledTimes(1);  
  });

  it('should throw an error if create fails', async () => {
    const createMessageDto: CreateMessageDto = {
      title: 'Test Title',
      description: 'Test Description',
      url: 'https://www.example.com',
    };

    const userId = '12345';
    const error = new Error('Error creating message');
    
    
    jest.spyOn(messageRepository, 'create').mockRejectedValue(error);

    await expect(useCase.execute(createMessageDto, userId)).rejects.toThrow(error);
  });
});
