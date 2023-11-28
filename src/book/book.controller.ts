import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ParsedUrlQuery } from 'node:querystring';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksProps } from './types/books.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
@UseGuards(AuthGuard())
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks(@Query() query: ParsedUrlQuery): Promise<BooksProps> {
    return this.bookService.findAll(query);
  }

  @Post('create-book')
  async createBook(@Body() book: CreateBookDto, @Req() req): Promise<Book> {
    return this.bookService.create(book, req.user);
  }

  @Get(':id')
  async findBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.findById(id);
  }

  @Put('update-book/:id')
  async updateBookById(
    @Param('id') id: string,
    @Body() book: UpdateBookDto,
    @Req() req,
  ): Promise<Book> {
    return this.bookService.updateById(id, book, req.user);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.deleteById(id);
  }
}
