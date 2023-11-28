import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { User } from './schema/user.schema';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ParsedUrlQuery } from 'node:querystring';
import { UserProps } from './types/user.types';
import { UpdateUserDto } from './dto/update.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException(
        'Invalid credentials (email or password)',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Invalid credentials (email or password)',
      );
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async findAll(query: ParsedUrlQuery): Promise<UserProps> {
    const resPerPage = Number(query.perPage) || 20;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword as string,
            $options: 'i',
          },
        }
      : {};

    const total = await this.userModel.countDocuments({ ...keyword });
    const users = await this.userModel
      .find({ ...keyword })
      .skip(skip)
      .limit(resPerPage)
      .select('-password')
      .select('-__v');

    return {
      total,
      users,
    };
  }

  async findById(id: string): Promise<User> {
    const isValidId = isValidObjectId(id);

    if (!isValidId) {
      throw new UnauthorizedException('Please provide a valid user id');
    }

    const user = await this.userModel
      .findById(id)
      .select('-password')
      .select('-__v');

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  async deleteById(id: string): Promise<User> {
    const isValidId = isValidObjectId(id);

    if (!isValidId) {
      throw new UnauthorizedException('Please provide a valid user id');
    }

    const user = await this.userModel.findByIdAndDelete(id);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  async updateById(id: string, userDto: UpdateUserDto): Promise<User> {
    const isValidId = isValidObjectId(id);

    if (!isValidId) {
      throw new UnauthorizedException('Please provide a valid user id');
    }

    const existingUser = await this.userModel.findById(id);

    if (!existingUser) {
      throw new UnauthorizedException('User not found');
    }

    const updateFields: Partial<User> = {};

    if (userDto.name) {
      updateFields.name = userDto.name;
    }

    if (userDto.password) {
      updateFields.password = await bcrypt.hash(userDto.password, 10);
    }

    const updateUser = await this.userModel.findByIdAndUpdate(
      id,
      updateFields,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateUser) {
      throw new UnauthorizedException('User not found');
    }

    return updateUser;
  }
}
