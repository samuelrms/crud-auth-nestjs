import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }

  async create(book: Book): Promise<Book> {
    const createBook = await this.bookModel.create(book);
    return createBook;
  }

  async findById(id: string): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please provide a valid id');
    }

    const book = await this.bookModel.findById(id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async updateById(id: string, book: Book): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please provide a valid id');
    }

    const updateBook = await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });

    if (!updateBook) {
      throw new NotFoundException('Book not found');
    }

    return updateBook;
  }

  async deleteById(id: string): Promise<Book> {
    const deleteBook = await this.bookModel.findByIdAndDelete(id);

    if (!deleteBook) {
      throw new NotFoundException('Book not found');
    }

    return deleteBook;
  }
}
