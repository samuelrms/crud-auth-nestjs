import {
  IsEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from '../schemas/book.schema';
import { User } from '../../auth/schema/user.schema';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly author: string;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsEnum(Category, {
    message: 'Must be a valid categories:' + Object.values(Category) + '.',
  })
  readonly category: Category;

  @IsEmpty({ message: 'You cannot specify user' })
  readonly user: User;
}
