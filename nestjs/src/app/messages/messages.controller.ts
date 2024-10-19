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
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { IUserRequest } from 'src/common/auth/jwt-payload/user-request.interface';
import { AuthGuard } from 'src/common/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createMessageDto: CreateMessageDto,
    @Req() request: IUserRequest,
  ) {
    return await this.messagesService.create(
      createMessageDto,
      request.user.sub,
    );
  }

  @Get('teste')
  async findAll() {
    return this.messagesService.findAll();
  }

  @Get()
  async findAllByLoggedUser(@Req() request: IUserRequest) {
    return await this.messagesService.findAllByLoggerUser(request.user.sub);
  }

  @Get(':id')
  async findById(@Req() request: IUserRequest, @Param('id') id: string) {
    return await this.messagesService.findById(request.user.sub, id);
  }

  @Patch(':id')
  async update(
    @Req() request: IUserRequest,
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return await this.messagesService.update(
      request.user.sub,
      id,
      updateMessageDto,
    );
  }

  @Delete(':id')
  async remove(@Req() request: IUserRequest, @Param('id') id: string) {
    await this.messagesService.remove(request.user.sub);
  }
}
