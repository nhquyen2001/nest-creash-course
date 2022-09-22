import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  getUsers(@Query('name') name?: string): User[] {
    return this.usersService.findAll(name);
  }

  @ApiOkResponse({ type: User, description: 'the user' })
  @ApiNotFoundResponse()
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): User {
    const user = this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @ApiCreatedResponse({ type: User })
  @ApiNotFoundResponse()
  @Post()
  createUser(@Body() body: CreateUserDto): User {
    return this.usersService.createUser(body);
  }
}
