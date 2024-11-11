import { UserController } from 'src/app/users/controllers/user.controller';
import { IUserRepository } from 'src/common/interfaces/repositories/user-repository.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { UserCreateUseCase } from 'src/app/users/usecases/user-create.usecase';
import { UserFindAllUseCase } from 'src/app/users/usecases/user-find-all.usecase';
import { UserFindOneUseCase } from 'src/app/users/usecases/user-find-one.usecase';
import { UserDeleteOneUseCase } from 'src/app/users/usecases/user-delete-one.usecase';
import { UserUpdateOneUseCase } from 'src/app/users/usecases/user-update-one.usecase';

describe('UserController', () => {
  let userController: UserController;

  const mockUserRepository = {
    findAll: jest.fn().mockResolvedValue([
      { id: '1', name: 'User1' },
      { id: '2', name: 'User2' },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register(), 
      ],
      controllers: [UserController],
      providers: [
        JwtService,
        ConfigService,
        UserCreateUseCase,
        UserFindAllUseCase,
        UserFindOneUseCase,
        UserDeleteOneUseCase,
        UserUpdateOneUseCase,
        {
          provide: 'IUserRepository', 
          useValue: mockUserRepository, 
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('deve retornar um array de users', async () => {
      const result = await userController.findAll();

      expect(result).toEqual([
        { id: '1', name: 'User1' },
        { id: '2', name: 'User2' },
      ]);
      expect(mockUserRepository.findAll).toHaveBeenCalled();
    });
  });
});
