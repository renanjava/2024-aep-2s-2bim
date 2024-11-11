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
            deleteById: jest.fn(),  // Mock do método deleteById
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
    const messageId = '12345';  // ID da mensagem
    const userId = '54321';  // ID do usuário

    const deleteSpy = jest.spyOn(messageRepository, 'deleteById');

    // Executando o caso de uso
    await useCase.execute(messageId, userId);

    // Verificando se o método deleteById foi chamado corretamente
    expect(deleteSpy).toHaveBeenCalledWith(userId, messageId);
    expect(deleteSpy).toHaveBeenCalledTimes(1);  // Verificando que foi chamado uma vez
  });

  it('should throw an error if deleteById fails', async () => {
    const messageId = '12345';
    const userId = '54321';
    const error = new Error('Error deleting message');
    
    // Simulando um erro no repositório
    jest.spyOn(messageRepository, 'deleteById').mockRejectedValue(error);

    await expect(useCase.execute(messageId, userId)).rejects.toThrow(error);
  });
});
