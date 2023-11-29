import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ParsedUrlQuery } from 'node:querystring';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

import { Book } from './schemas/book.schema';
import { BooksProps } from './types/books.types';
import { User } from '../auth/schema/user.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<Book>,
  ) {}

  async findAll(query: ParsedUrlQuery): Promise<BooksProps> {
    const resPerPage = Number(query.perPage) || 20;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword as string,
            $options: 'i',
          },
        }
      : {};
    const total = await this.bookModel.countDocuments({ ...keyword });
    const books = await this.bookModel
      .find({ ...keyword })
      .skip(skip)
      .limit(resPerPage);
    return {
      total,
      books,
    };
  }

  async create(book: Book, user: User): Promise<Book> {
    const data = Object.assign(book, { user: user._id });
    const createBook = await this.bookModel.create(data);
    return createBook;
  }

  async findById(id: string): Promise<Book> {
    const isValidId = isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please provide a valid id');
    }

    const book = await this.bookModel.findById(id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async updateById(id: string, book: Book, user: User): Promise<Book> {
    const data = Object.assign(book, { user: user._id });
    const isValidId = isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please provide a valid id');
    }

    const updateBook = await this.bookModel.findByIdAndUpdate(id, data, {
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
