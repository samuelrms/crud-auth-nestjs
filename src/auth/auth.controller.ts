import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ParsedUrlQuery } from 'node:querystring';
import { User } from './schema/user.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Get('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Get('users')
  @UseGuards(AuthGuard())
  async findAllUsers(
    @Query() query: ParsedUrlQuery,
  ): Promise<{ users: User[]; total: number }> {
    return this.authService.findAll(query);
  }

  @Get('user/:id')
  @UseGuards(AuthGuard())
  async findUserById(@Param('id') id: string): Promise<User> {
    return this.authService.findById(id);
  }

  @Put('user/:id')
  @UseGuards(AuthGuard())
  async updateUserById(
    @Param('id') id: string,
    @Body() user: User,
  ): Promise<User> {
    return this.authService.updateById(id, user);
  }

  @Delete('user/:id')
  @UseGuards(AuthGuard())
  async deleteUserById(@Param('id') id: string): Promise<User> {
    return this.authService.deleteById(id);
  }
}
