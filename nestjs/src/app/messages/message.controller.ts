import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { IUserRequest } from 'src/common/auth/jwt-payload/user-request.interface';
import { AuthGuard } from 'src/common/auth/guards/auth.guard';
import { MessageCreateUseCase } from './usecases/message-create.usecase';
import { MessageFindAllUseCase } from './usecases/message-find-all.usecase';
import { MessageFindOneUseCase } from './usecases/message-find-one.usecase';
import { MessageDeleteOneUseCase } from './usecases/message-delete-one.usecase';
import { MessageUpdateOneUseCase } from './usecases/message-update-one.usecase';
import { MessageFindByLoggedUseCase } from './usecases/message-find-by-logged.usecase';

@UseGuards(AuthGuard)
@Controller('messages')
export class MessageController {
  constructor(
    private readonly messageCreateUseCase: MessageCreateUseCase,
    private readonly messageFindAllUseCase: MessageFindAllUseCase,
    private readonly messageFindOneUseCase: MessageFindOneUseCase,
    private readonly messageDeleteOneUseCase: MessageDeleteOneUseCase,
    private readonly messageUpdateOneUseCase: MessageUpdateOneUseCase,
    private readonly messageFindByLoggedUseCase: MessageFindByLoggedUseCase,
  ) {}

  @Post()
  async create(
    @Body() createMessageDto: CreateMessageDto,
    @Req() request: IUserRequest,
  ) {
    return await this.messageCreateUseCase.execute(
      createMessageDto,
      request.user.sub,
    );
  }

  @Get('teste')
  async findAll() {
    return this.messageFindAllUseCase.execute();
  }

  @Get()
  async findAllByLoggedUser(@Req() request: IUserRequest) {
    return await this.messageFindByLoggedUseCase.execute(request.user.sub);
  }

  @Get(':id')
  async findById(@Req() request: IUserRequest, @Param('id') id: string) {
    return await this.messageFindOneUseCase.execute(request.user.sub, id);
  }

  @Patch(':id')
  async update(
    @Req() request: IUserRequest,
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return await this.messageUpdateOneUseCase.execute(
      request.user.sub,
      id,
      updateMessageDto,
    );
  }

  @Delete(':id')
  async remove(@Req() request: IUserRequest, @Param('id') id: string) {
    await this.messageDeleteOneUseCase.execute(id, request.user.sub);
  }
}
