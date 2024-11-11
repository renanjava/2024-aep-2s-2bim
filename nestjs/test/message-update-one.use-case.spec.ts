import { Test, TestingModule } from '@nestjs/testing';
import { MessageUpdateOneUseCase } from 'src/app/messages/usecases/message-update-one.usecase';
import { IMessageRepository } from 'src/common/interfaces/repositories/message-repository.interface';
import { MessageDocument } from 'src/app/messages/entities/message.entity';
import { UpdateMessageDto } from 'src/app/messages/dto/update-message.dto';

describe('MessageUpdateOneUseCase', () => {
  let useCase: MessageUpdateOneUseCase;
  let messageRepository: IMessageRepository<MessageDocument, UpdateMessageDto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageUpdateOneUseCase,
        {
          provide: 'IMessageRepository',
          useValue: {
            updateById: jest.fn(),  // Mock do método updateById
          },
        },
      ],
    }).compile();

    useCase = module.get<MessageUpdateOneUseCase>(MessageUpdateOneUseCase);
    messageRepository = module.get<IMessageRepository<MessageDocument, UpdateMessageDto>>('IMessageRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call updateById on the repository with correct data', async () => {
    const userId = '67890';  // ID do usuário
    const messageId = '12345'; // ID da mensagem
    const updateMessageDto: UpdateMessageDto = {
      title: 'Updated Title',
      description: 'Updated description.',
      url: 'https://www.updated-url.com',
    };

    const updateSpy = jest.spyOn(messageRepository, 'updateById');

    // Executando o caso de uso
    await useCase.execute(userId, messageId, updateMessageDto);

    // Verificando se o método updateById foi chamado corretamente
    expect(updateSpy).toHaveBeenCalledWith(userId, messageId, updateMessageDto);
    expect(updateSpy).toHaveBeenCalledTimes(1);  // Verificando que foi chamado uma vez
  });

  it('should throw an error if updateById fails', async () => {
    const userId = '67890';
    const messageId = '12345';
    const updateMessageDto: UpdateMessageDto = {
      title: 'Updated Title',
      description: 'Updated description.',
      url: 'https://www.updated-url.com',
    };

    const error = new Error('Error updating message');
    
    // Simulando um erro no repositório
    jest.spyOn(messageRepository, 'updateById').mockRejectedValue(error);

    await expect(useCase.execute(userId, messageId, updateMessageDto)).rejects.toThrow(error);
  });
});
