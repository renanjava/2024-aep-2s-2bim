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
  @UseGuards(AuthGuard)
  findByLoggedUser(@Req() request: IUserRequest) {
    return this.messagesService.findByLoggerUser(request.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
