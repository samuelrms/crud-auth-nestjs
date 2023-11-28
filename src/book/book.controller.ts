import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ParsedUrlQuery } from 'node:querystring';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks(
    @Query() query: ParsedUrlQuery,
  ): Promise<{ books: Book[]; total: number }> {
    return this.bookService.findAll(query);
  }

  @Post('create-book')
  async createBook(@Body() book: CreateBookDto): Promise<Book> {
    return this.bookService.create(book);
  }

  @Get(':id')
  async findBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.findById(id);
  }

  @Put('update-book/:id')
  async updateBookById(
    @Param('id') id: string,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateById(id, book);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.deleteById(id);
  }
}
